import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from 'axios';


export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);

    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false);

    

    const getDoctorsData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/lists');
            if(data.success){
                setDoctors(data.doctors);


            }else{
                toast.error(data.message);
            }

        }catch(error){
            console.log("Error fetching doctors data:", error);
            toast.error("Error fetching doctors data: " + error.message);

        }
    }

    const value = {
        doctors,
        token, setToken,
        backendUrl

    }

    useEffect(()=>{
        getDoctorsData();

    },[])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider