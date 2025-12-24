import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async(req, res)=>{
    try{

        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message:"Doctor Availability updated successfully"});


    } catch(error){
        res.json({success:false, message:error.message})

    }

}

const doctorList = async(req, res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success:true, doctors})
    }
        catch(error){
            res.json({success:false, message:error.message})

        }
    
}

// api for doctor login

const loginDoctor = async(req, res)=>{
    try{
        const {email, password} = req.body;

        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false, message:"Doctor not found"});
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if(!isMatch){
            return res.json({success:false, message:"Incorrect Password"});
        }

        const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET);

        res.json({success:true, token});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

////api to get doctor appointments list

const appointmentsDoctor = async(req, res)=>{
    try{
        const {docId} = req.body;

        const appointments = await appointmentModel.find({docId});
        res.json({success:true, appointments});
    }
    catch(error){
        res.json({success:false, message:error.message})
    }


}

//api to mark appointment completed by doctor

const appointmentComplete = async(req, res)=>{
    try{

        const {appointmentId, docId} = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if(appointment && appointment.docId == docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true});

            return res.json({success:true, message:"Appointment marked as completed"});


            
            
        }else{
            res.json({success:false, message:"Appointment not found or unauthorized"});
        }

    }catch(error){
        res.json({success:false, message:error.message})
    }
}


//api to cancel appointment by doctor

const appointmentCancel = async(req, res)=>{
    try{

        const {appointmentId, docId} = req.body;

        const appointment = await appointmentModel.findById(appointmentId);

        if(appointment && appointment.docId == docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});

            return res.json({success:true, message:"Appointment marked as cancelled"});


            
            
        }else{
            res.json({success:false, message:"Appointment not found or unauthorized"});
        }

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

// API to get doctor dashboard data
const doctorDashboard = async(req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId });

        // Calculate earnings (only from completed & paid appointments)
        let earnings = 0;
        appointments.forEach(item => {
            if (item.isCompleted && item.payment) {
                earnings += item.amount;
            }
        });

        // Calculate stats
        const totalAppointments = appointments.length;
        const completedAppointments = appointments.filter(a => a.isCompleted).length;
        const cancelledAppointments = appointments.filter(a => a.cancelled).length;
        const pendingAppointments = appointments.filter(a => !a.cancelled && !a.isCompleted).length;

        // Today's appointments
        const today = new Date();
        const todayStr = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear();
        const todayAppointments = appointments.filter(a => a.slotDate === todayStr && !a.cancelled).length;

        // Get unique patients
        const patients = [];
        appointments.forEach(item => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        // Get latest appointments - userData is already stored in appointment
        const latestAppointments = appointments.reverse().slice(0, 5);

        const dashData = {
            totalAppointments,
            completedAppointments,
            cancelledAppointments,
            pendingAppointments,
            todayAppointments,
            totalEarnings: earnings,
            patients: patients.length,
            latestAppointments
        };

        res.json({ success: true, dashData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to get doctor profile
const doctorProfile = async(req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to update doctor profile
const updateDoctorProfile = async(req, res) => {
    try {
        const { docId, fees, address, available, about } = req.body;
        
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available, about });
        
        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

 

export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile};