import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);

    const[appointments, setAppointments] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async()=>{
        try{

            const {data} = await axios.get(backendUrl + '/api/admin/all-doctors', {headers:{atoken:aToken}})
            if(data.success){
                setDoctors(data.doctors);
                console.log("Doctors fetched:", data.doctors);
            } else{
                toast.error("Failed to fetch doctors");
            }






        } catch(error){
            toast.error("Error fetching doctors: " + error.message);

        }
    }

    

    const changeAvailability = async(docId)=>{
        try{
            const {data} = await axios.post (backendUrl + '/api/admin/change-availability', {docId}, {headers:{atoken:aToken}});
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            } else{
                toast.error(data.message);
            }

        } catch(error){
            toast.error("Error changing availability: " + error.message);

        }

    }

    const getAllAppointments = async()=>{
        try{

            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{atoken:aToken}});
            if(data.success){
                setAppointments(data.appointments);

            } else{
                toast.error("Failed to fetch appointments");
            }

        }catch(error){
            toast.error("Error fetching appointments: " + error.message);
        }
    }

    const cancelAppointment = async(appointmentId)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{atoken:aToken}});
            if(data.success){
                toast.success(data.message);
                getAllAppointments();
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error("Error cancelling appointment: " + error.message);
        }
    }

    const value ={
        aToken, setAToken,
        backendUrl,doctors, getAllDoctors, changeAvailability,
        appointments, setAppointments, getAllAppointments,
        cancelAppointment


    }

    return (
        <AdminContext.Provider value ={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider