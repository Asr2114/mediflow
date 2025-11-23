import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const {backendUrl, aToken} = useContext(AdminContext);

  const onSubmitHandler = async (event) =>{

    event.preventDefault();
    try{

        if(!docImg){
            return toast.error("Please upload doctor's image");
        }
        
        const formData = new FormData();

        formData.append('image', docImg);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('speciality', speciality);
        formData.append('degree', degree);
        formData.append('experience', experience);
        formData.append('about', about);
        formData.append('fees',Number(fees));
        formData.append('address', JSON.stringify({line1:address1, line2:address2}));

        //console log form data
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{ atoken: aToken }});

        if(data.success){
            toast.success("Doctor Added Successfully");
            setDocImg(false);
            setName('');
            setEmail('');
            setPassword('');
            setExperience('1 Year');
            setFees('');
            setAbout('');
            setSpeciality('General Physician');
            setDegree('');
            setAddress1('');
            setAddress2('');

        } else{
            toast.error(data.message);
        }

    } catch(error){

    }

  }


    return (
        <div className='w-full h-full p-4 sm:p-8 lg:p-12'>
            {/* Header Section */}
            <div className='mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Add New Doctor</h1>
                <p className='text-gray-600'>Fill in the details below to add a new doctor to the platform</p>
            </div>

            {/* Main Form Container */}
            <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                
                {/* Form Content */}
                <div className='p-6 sm:p-8 lg:p-10'>
                    
                    {/* Image Upload Section */}
                    <div className='mb-10'>
                        <label 
                            htmlFor='doc-img'
                            className='group cursor-pointer flex flex-col items-center justify-center w-full px-6 py-12 sm:py-16 rounded-2xl border-2 border-dashed border-primary hover:border-indigo-600 hover:bg-primary/10 transition-all duration-300'
                        >
                            <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors'>
                                <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <p className='text-base font-semibold text-gray-800'>Upload Doctor Picture</p>
                            <p className='text-sm text-gray-600 mt-1'>PNG, JPG up to 5MB</p>
                        </label>
                        <input onChange={(e)=> setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                    </div>

                    {/* Two Column Grid for Form Fields */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8'>
                        
                        {/* Left Column */}
                        <div className='space-y-6'>
                            {/* Doctor Name */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Doctor Name</label>
                                <input 
                                    onChange={(e)=> setName(e.target.value)} value={name}
                                    type='text'
                                    placeholder='Dr. John Doe'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                                <input 

                                    type='email'
                                    onChange={(e)=> setEmail(e.target.value)} value={email}
                                    placeholder='doctor@mediflow.com'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
                                <input 
                                    type='password'
                                    onChange={(e)=> setPassword(e.target.value)} value={password}
                                    placeholder='Enter secure password'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Experience</label>
                                <select 
                                onChange={(e)=> setExperience(e.target.value)} value={experience}
                                
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Year</option>
                                    <option value="3 Year">3 Year</option>
                                    <option value="4 Year">4 Year</option>
                                    <option value="5 Year">5 Year</option>
                                    <option value="6 Year">6 Year</option>
                                    <option value="7 Year">7 Year</option>
                                    <option value="8 Year">8 Year</option>
                                    <option value="9 Year">9 Year</option>
                                    <option value="10 Year">10 Year</option>
                                </select>
                            </div>

                            {/* Fees */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Consultation Fees</label>
                                <div className='relative'>
                                    <span className='absolute left-4 top-3 text-gray-600 font-semibold'>₹</span>
                                    <input 
                                        type='number'
                                        onChange={(e)=> setFees(e.target.value)} value={fees}
                                        placeholder='500'
                                        className='w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='space-y-6'>
                            {/* Speciality */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Speciality</label>
                                <select 
                                onChange={(e)=> setSpeciality(e.target.value)} value={speciality}
                                
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'>
                                    <option value="General Physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            {/* Education */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Education/Degree</label>
                                <input 
                                    type='text'
                                    onChange={(e)=> setDegree(e.target.value)} value={degree}
                                    placeholder='MBBS, MD, etc.'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>

                            {/* Address Line 1 */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 1</label>
                                <input 
                                    type='text'
                                    onChange={(e)=> setAddress1(e.target.value)} value={address1}
                                    placeholder='Clinic/Hospital Address'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 2</label>
                                <input 
                                    type='text'
                                    onChange={(e)=> setAddress2(e.target.value)} value={address2}
                                    placeholder='City, State, ZIP'
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none'
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mb-8'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>About Doctor</label>
                        <textarea 
                            onChange={(e)=> setAbout(e.target.value)} value={about}
                            placeholder='Write a brief description about the doctor, qualifications, experience, and specialization...'
                            rows={5}
                            className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none resize-none'
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-4'>
                        <button 
                            type='submit'
                            className='flex-1 bg-linear-to-r from-indigo-600 via-primary to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                            </svg>
                            Add Doctor
                        </button>
                        <button 
                            type='reset'
                            className='px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300'
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor