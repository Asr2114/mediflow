import validator from 'validator';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as Cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

import Razorpay from 'razorpay';


//register user API
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }
         
        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be atleast 8 characters" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user to database
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            date: Date.now()
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // _id

        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET);
        res.json({ success: true, token });













    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//api for user login

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found, please register" });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });      

    } catch (error) {
        res.json({ success: false, message: error.message }) 

    }

}

//api for getting user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await userModel.findById(userId).select('-password');

        res.json({ success: true, userData });



    }
    catch (error) {
        res.json({ success: false, message: error.message })

    }

}

//api for updating user profile data
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;  // Get userId from authenticated user
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "All fields are Mandatory" });

        }

        // Parse address safely
        let parsedAddress;
        try {
            parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
        } catch (parseError) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name, phone, address: parsedAddress, dob, gender,
        })

        if(imageFile){
            //upload image to cloudinary and get url

            const imageUpload = await Cloudinary.uploader.upload(imageFile.path, {
                resource_type:'image'
            })
            const imageURL = imageUpload.secure_url;
  
            await userModel.findByIdAndUpdate(userId, {
            image:imageURL
        })
            
        }

        res.json({message:"Profile Updated Successfully", success:true});



        


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


//appointment booking API

const bookAppointment = async(req, res) =>{
    try{
        const userId = req.user.id;  // Get userId from authenticated user
        const {docId, slotDate, slotTime} = req.body;

        const docData = await doctorModel.findById(docId).select('-password -email');

        if(!docData.available){
            return res.json({success:false, message:'Doctor is not available'});
        }

        let slots_booked = docData.slots_booked

        //checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:'Slot not available, please choose another slot'});
            } else{
                slots_booked[slotDate].push(slotTime);
            }
        } else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime, slotDate,
            date:Date.now(),

        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save new slots data in doctor data
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success:true, message:"Apppointment booked successfully"});

    } catch(error){
        res.json({success:false, message:error.message})
    }
}


const listAppointments = async(req, res) =>{
    try{

        const userId = req.user.id;
        const appointments = await appointmentModel.find({userId}).sort({date:-1});

        res.json({success:true, appointments});



    } catch(error){
        res.json({success:false, message:error.message})

    }
}

//api to cancel appointment

const cancelAppointment = async(req, res)=>{
    try{
        const userId = req.user.id;
        const {appointmentId} = req.body;
        
        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify appointment user
        if(appointmentData.userId !== userId){
            return res.json({success:false, message:"You are not aurhorized to cancel this appointment"});
        }

        //update appointment cancelled status
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});

        //remove slot from booked slot
        const {docId, slotDate, slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        if(slots_booked[slotDate]){
            slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, {slots_booked} );

            res.json({success:true, message:"appointment cancelled Successfully"});


        }


    }catch(error){
        res.json({success:false, message:error.message})

    }
}

//api for payment using razorpay

const paymentRazorpay = async(req, res)=>{
    try{

        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false, message:"Invalid appointment for payment"});

        }

        // Create Razorpay instance inside function so env vars are loaded
        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        //creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100, //in paise
            currency: process.env.CURRENCY || 'INR',
            receipt: appointmentId,
        }

        //create order
        const order = await razorpayInstance.orders.create(options);

        res.json({success:true, order});

    } catch(error){
        res.json({success:false, message:error.message})

    }
}


//api to verify payment
const verifyRazorpay = async(req, res)=>{
    try{
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        console.log('Order Info:',orderInfo);

    }catch(error){}
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay,verifyRazorpay }; 