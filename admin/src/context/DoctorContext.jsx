import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();



const DoctorContextProvider=(props)=>{


    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken') : '');

    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [profileData, setProfileData] = useState(null);

    const getDoctorAppointments = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/doctor-appointments', {headers:{dtoken: dToken}});

            if(data.success){
                setDoctorAppointments(data.appointments.reverse());
                console.log("Doctor appointments fetched:", data.appointments);
                
            }
            else{
                toast.error("Failed to fetch appointments: " + data.message);
            }

        }catch(error){
            toast.error("Error fetching appointments: " + error.message);
        }
    }

//mark the appointment as completed
    const completeAppointment = async(appointmentId)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dtoken: dToken}});

            if(data.success){
                toast.success(data.message);
                getDoctorAppointments();
                getDashData();
            }else{
                toast.error("Failed to complete appointment: " + data.message);
            }

        }catch(error){
            toast.error("Error completing appointment: " + error.message);

        }
    }

    const cancelAppointment = async(appointmentId)=>{
        try{

            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dtoken:dToken}})

            if(data.success){
                toast.success(data.message);
                getDoctorAppointments();
                getDashData();
            }else{
                toast.error("Failed to cancel appointment: " + data.message);
            }
            
        }catch(error){
            toast.error("Error cancelling appointment: " + error.message);
        }
    }

    // Get dashboard data
    const getDashData = async() => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dtoken: dToken } });
            
            if (data.success) {
                setDashData(data.dashData);
                console.log("Dashboard data fetched:", data.dashData);
            } else {
                toast.error("Failed to fetch dashboard: " + data.message);
            }
        } catch (error) {
            toast.error("Error fetching dashboard: " + error.message);
        }
    }

    // Get profile data
    const getProfileData = async() => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dtoken: dToken } });
            
            if (data.success) {
                setProfileData(data.profileData);
                console.log("Profile data fetched:", data.profileData);
            } else {
                toast.error("Failed to fetch profile: " + data.message);
            }
        } catch (error) {
            toast.error("Error fetching profile: " + error.message);
        }
    }

    // Update profile data
    const updateProfileData = async(updateData) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/update-profile', 
                updateData, 
                { headers: { dtoken: dToken } }
            );
            
            if (data.success) {
                toast.success(data.message);
                getProfileData(); // Refresh profile data
                return true;
            } else {
                toast.error("Failed to update profile: " + data.message);
                return false;
            }
        } catch (error) {
            toast.error("Error updating profile: " + error.message);
            return false;
        }
    }

    const value={
        dToken, setDToken,
        backendUrl, doctorAppointments, setDoctorAppointments,
        getDoctorAppointments, completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData, updateProfileData


    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;