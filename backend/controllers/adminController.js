
import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'


// Api for adding doctor
const addDoctor = async(req, res)=>{

    try{

        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;


        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"All fields are Mandatory"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid Email"})
        }

        //validating strong password

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a Strong Password"})
        }

        //encrypt password using bcrypt

        //hasing doctor password using salt bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        //upload image to cloudinary to get link for database in mongo
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url;


        //save to database
        const doctorData = {
            name, email, 
            image: imageUrl,
            password:hashedPassword,
            speciality, 
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"Doctor Added"});


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})

    }

}

//api for admin login
const loginAdmin = async(req, res)=>{
    try{
        const {email, password} = req.body;

        console.log("Admin Login Attempt:", {email, hasPassword: !!password});

        //checking for all data to login admin
        if(!email || !password){
            return res.json({success:false, message:"Email and password are required"})
        }

        //trim whitespace from inputs
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log("Credentials Check:", {
            providedEmail: trimmedEmail,
            expectedEmail: process.env.ADMIN_EMAIL,
            emailMatch: trimmedEmail === process.env.ADMIN_EMAIL,
            passwordMatch: trimmedPassword === process.env.ADMIN_PASSWORD
        });

        //checking admin credentials
        if(trimmedEmail === process.env.ADMIN_EMAIL && trimmedPassword === process.env.ADMIN_PASSWORD){

            //Generate JWT token with proper payload
            const token = jwt.sign({email: trimmedEmail}, process.env.JWT_SECRET)
            console.log("Admin login successful, token generated");
            res.json({success:true, token});

        }else{
            console.log("Invalid credentials provided");
            res.json({success:false, message:"Invalid Admin Credentials"})
        }

    } catch(error){
        console.log("Admin Login Error:", error)
        res.json({success:false, message:error.message})
    }
}

//API to get all doctors in admin panel
const allDoctors = async(req, res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true, doctors});

    } catch(error){
        res.json({success:false, message:error.message})
    }

}

//API to delete a doctor
const deleteDoctor = async(req, res)=>{
    try{
        const {doctorId} = req.body;

        if(!doctorId){
            return res.json({success:false, message:"Doctor ID is required"})
        }

        const result = await doctorModel.findByIdAndDelete(doctorId);

        if(!result){
            return res.json({success:false, message:"Doctor not found"})
        }

        res.json({success:true, message:"Doctor deleted successfully"});

    } catch(error){
        res.json({success:false, message:error.message})
    }
}


export {addDoctor, loginAdmin, allDoctors, deleteDoctor};