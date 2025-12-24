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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {backendUrl, aToken} = useContext(AdminContext);

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        setIsSubmitting(true);
        try{
            if(!docImg){
                setIsSubmitting(false);
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
            toast.error('Error adding doctor');
        } finally {
            setIsSubmitting(false);
        }
    }

    const specialities = [
        { value: 'General Physician', icon: '🩺', color: 'from-blue-500 to-cyan-500' },
        { value: 'Gynecologist', icon: '👩‍⚕️', color: 'from-pink-500 to-rose-500' },
        { value: 'Dermatologist', icon: '✨', color: 'from-purple-500 to-indigo-500' },
        { value: 'Pediatricians', icon: '👶', color: 'from-green-500 to-emerald-500' },
        { value: 'Neurologist', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
        { value: 'Gastroenterologist', icon: '🫁', color: 'from-orange-500 to-amber-500' },
    ];

    return (
        <div className='w-full min-h-screen p-4 sm:p-6 lg:p-8'>
            {/* Hero Header */}
            <div className='glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 mb-8 animate-fade-in'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
                    {/* Title */}
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse-glow'>
                            <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                            </svg>
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-black text-gray-900'>Add New Doctor</h1>
                            <p className='text-gray-500 mt-1'>Onboard a healthcare professional to your platform</p>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className='lg:ml-auto flex flex-wrap gap-2'>
                        <span className='px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100'>💡 All fields required</span>
                        <span className='px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100'>📸 Max 5MB image</span>
                    </div>
                </div>
            </div>

            {/* Main Form Container */}
            <form onSubmit={onSubmitHandler} className='glass rounded-3xl border border-gray-200 overflow-hidden animate-fade-in-up' style={{animationDelay: '0.1s'}}>
                
                {/* Progress Indicator */}
                <div className='h-1 bg-gray-100'>
                    <div className='h-full bg-linear-to-r from-primary via-indigo-500 to-purple-500 transition-all duration-500' 
                         style={{width: `${Math.min(100, ((name ? 10 : 0) + (email ? 10 : 0) + (password ? 10 : 0) + (degree ? 10 : 0) + (fees ? 10 : 0) + (address1 ? 10 : 0) + (address2 ? 10 : 0) + (about ? 15 : 0) + (docImg ? 15 : 0)))}%`}}></div>
                </div>
                
                {/* Form Content */}
                <div className='p-6 sm:p-8 lg:p-10'>
                    
                    {/* Image Upload Section */}
                    <div className='mb-10 animate-fade-in-up' style={{animationDelay: '0.2s'}}>
                        <label className='block text-sm font-bold text-gray-700 mb-3'>
                            Doctor's Photo <span className='text-red-500'>*</span>
                        </label>
                        <label 
                            htmlFor='doc-img'
                            className={`group cursor-pointer flex flex-col items-center justify-center w-full px-6 py-10 sm:py-14 rounded-2xl border-2 border-dashed transition-all duration-500 ${
                                docImg 
                                    ? 'border-green-400 bg-green-50/50' 
                                    : 'border-primary/50 hover:border-primary hover:bg-primary/5'
                            }`}
                        >
                            {docImg ? (
                                <div className='flex items-center gap-6'>
                                    <div className='relative'>
                                        <img 
                                            src={URL.createObjectURL(docImg)} 
                                            alt='Doctor Preview' 
                                            className='w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white'
                                        />
                                        <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                                            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-base font-bold text-green-700'>Image Selected!</p>
                                        <p className='text-sm text-green-600'>{docImg.name}</p>
                                        <p className='text-xs text-gray-500 mt-1'>Click to change</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className='w-16 h-16 bg-linear-to-br from-primary/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                                        <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <p className='text-base font-bold text-gray-800'>Upload Doctor's Photo</p>
                                    <p className='text-sm text-gray-500 mt-1'>PNG, JPG up to 5MB</p>
                                    <p className='text-xs text-primary mt-2 font-medium'>Click or drag & drop</p>
                                </>
                            )}
                        </label>
                        <input onChange={(e)=> setDocImg(e.target.files[0])} type='file' id='doc-img' hidden accept='image/*' />
                    </div>

                    {/* Speciality Selection */}
                    <div className='mb-10 animate-fade-in-up' style={{animationDelay: '0.25s'}}>
                        <label className='block text-sm font-bold text-gray-700 mb-4'>
                            Select Speciality <span className='text-red-500'>*</span>
                        </label>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
                            {specialities.map((spec, index) => (
                                <button
                                    type='button'
                                    key={spec.value}
                                    onClick={() => setSpeciality(spec.value)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                                        speciality === spec.value 
                                            ? `bg-linear-to-br ${spec.color} border-transparent text-white shadow-lg scale-105` 
                                            : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className='text-2xl block mb-1'>{spec.icon}</span>
                                    <span className={`text-xs font-semibold ${speciality === spec.value ? 'text-white' : 'text-gray-700'}`}>
                                        {spec.value.split(' ')[0]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Two Column Grid for Form Fields */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8'>
                        
                        {/* Left Column */}
                        <div className='space-y-6'>
                            {/* Doctor Name */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.3s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    Full Name <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                        </svg>
                                    </div>
                                    <input 
                                        onChange={(e)=> setName(e.target.value)} value={name}
                                        type='text'
                                        placeholder='Dr. John Smith'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.35s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    Email Address <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <input 
                                        type='email'
                                        onChange={(e)=> setEmail(e.target.value)} value={email}
                                        placeholder='doctor@mediflow.com'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.4s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    Password <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                        </svg>
                                    </div>
                                    <input 
                                        type='password'
                                        onChange={(e)=> setPassword(e.target.value)} value={password}
                                        placeholder='Enter secure password'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Experience & Fees Row */}
                            <div className='grid grid-cols-2 gap-4 animate-fade-in-up' style={{animationDelay: '0.45s'}}>
                                <div>
                                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                                        Experience <span className='text-red-500'>*</span>
                                    </label>
                                    <select 
                                        onChange={(e)=> setExperience(e.target.value)} value={experience}
                                        className='w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none cursor-pointer'
                                    >
                                        {[...Array(15)].map((_, i) => (
                                            <option key={i} value={`${i+1} Year`}>{i+1} Year{i > 0 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                                        Fees (₹) <span className='text-red-500'>*</span>
                                    </label>
                                    <div className='relative'>
                                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold'>₹</span>
                                        <input 
                                            type='number'
                                            onChange={(e)=> setFees(e.target.value)} value={fees}
                                            placeholder='500'
                                            className='w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='space-y-6'>
                            {/* Education */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.5s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    Education/Degree <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 14l9-5-9-5-9 5 9 5z' />
                                            <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' />
                                        </svg>
                                    </div>
                                    <input 
                                        type='text'
                                        onChange={(e)=> setDegree(e.target.value)} value={degree}
                                        placeholder='MBBS, MD, MS...'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Line 1 */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.55s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    Clinic/Hospital Address <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                        </svg>
                                    </div>
                                    <input 
                                        type='text'
                                        onChange={(e)=> setAddress1(e.target.value)} value={address1}
                                        placeholder='Building, Street Name'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Line 2 */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.6s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    City & State <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                        </svg>
                                    </div>
                                    <input 
                                        type='text'
                                        onChange={(e)=> setAddress2(e.target.value)} value={address2}
                                        placeholder='City, State - ZIP Code'
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            {/* About Section */}
                            <div className='animate-fade-in-up' style={{animationDelay: '0.65s'}}>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                    About Doctor <span className='text-red-500'>*</span>
                                </label>
                                <textarea 
                                    onChange={(e)=> setAbout(e.target.value)} value={about}
                                    placeholder='Write a brief professional bio, qualifications, experience, and areas of expertise...'
                                    rows={4}
                                    className='w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none resize-none'
                                    required
                                />
                                <p className='text-xs text-gray-500 mt-2'>{about.length}/500 characters</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 animate-fade-in-up' style={{animationDelay: '0.7s'}}>
                        <button 
                            type='submit'
                            disabled={isSubmitting}
                            className='flex-1 btn-primary bg-linear-to-r from-primary via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-primary text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
                        >
                            {isSubmitting ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                    Adding Doctor...
                                </>
                            ) : (
                                <>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                                    </svg>
                                    Add Doctor to Team
                                </>
                            )}
                        </button>
                        <button 
                            type='reset'
                            onClick={() => {
                                setDocImg(false);
                                setName('');
                                setEmail('');
                                setPassword('');
                                setFees('');
                                setAbout('');
                                setDegree('');
                                setAddress1('');
                                setAddress2('');
                            }}
                            className='px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300'
                        >
                            Reset Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor