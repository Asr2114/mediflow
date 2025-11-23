import validator from 'validator';
import bcrypt from 'bcrypt';
import {userModel} from '../models/userModel.js';
import jwt from 'jsonwebtoken';


//register user API
const registerUser = async(req, res)=>{
     try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false, message:"All fields are required"});
        }
         //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Please enter a valid email'});
        }
         //validating strong password
        if(password.length < 8){
            return res.json({success:false, message:"Password must be atleast 8 characters"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user to database
        const userData = {
            name:name, 
            email:email,
            password:hashedPassword,
            date:Date.now()
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // _id

        const token = jwt.sign({id:user._id,}, process.env.JWT_SECRET);
        res.json({success:true,token});

        











     }catch(error){
        res.json({success:false, message:error.message})

     }
}

//api for user login

const loginUser = async(req, res)=>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success:false, message:"All fields are required"});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User not found, please register"});

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:"Incorrect password"});
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({success:true, token});

    } catch(error){
        res.json({success:false, message:error.message})

    }

}

//api for getting user profile data
const getProfile = async(req, res)=>{
    try{
        const userId = req.user.id;

        const userData = await userModel.findById(userId).select('-password');

        res.json({success:true, userData});  

        

    }
    catch(error){
        res.json({success:false, message:error.message})

    }

}

export {registerUser, loginUser, getProfile};