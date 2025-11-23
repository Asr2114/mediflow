import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get JWT token from admin login first
const BACKEND_URL = 'http://localhost:4000';
const ADMIN_EMAIL = 'admin@mediflow.com';
const ADMIN_PASSWORD = 'Admin@123';

// Doctor data with local image paths
const doctorsData = [
    {
        name: 'Dr. Richard James',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '17th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc1.png'
    },
    {
        name: 'Dr. Emily Larson',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: 3,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address1: '27th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc2.png'
    },
    {
        name: 'Dr. Sarah Patel',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: 1,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address1: '37th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc3.png'
    },
    {
        name: 'Dr. Christopher Lee',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: 2,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address1: '47th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc4.png'
    },
    {
        name: 'Dr. Jennifer Garcia',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '57th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc5.png'
    },
    {
        name: 'Dr. Andrew Williams',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '57th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc6.png'
    },
    {
        name: 'Dr. Christopher Davis',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '17th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc7.png'
    },
    {
        name: 'Dr. Timothy White',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: 3,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address1: '27th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc8.png'
    },
    {
        name: 'Dr. Ava Mitchell',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: 1,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address1: '37th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc9.png'
    },
    {
        name: 'Dr. Jeffrey King',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: 2,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address1: '47th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc10.png'
    },
    {
        name: 'Dr. Zoe Kelly',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '57th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc11.png'
    },
    {
        name: 'Dr. Patrick Harris',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '57th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc12.png'
    },
    {
        name: 'Dr. Chloe Evans',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: 4,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address1: '17th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc13.png'
    },
    {
        name: 'Dr. Ryan Martinez',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: 3,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address1: '27th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc14.png'
    },
    {
        name: 'Dr. Amelia Hill',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: 1,
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address1: '37th Cross, Richmond',
        address2: 'Circle, Ring Road, London',
        imagePath: '../frontend/src/assets/doc15.png'
    }
];

async function getAdminToken() {
    try {
        console.log('🔐 Getting admin token...');
        const response = await axios.post(`${BACKEND_URL}/api/admin/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        
        if (response.data.success) {
            console.log('✅ Admin token obtained successfully\n');
            return response.data.token;
        } else {
            console.error('❌ Login failed:', response.data.message);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Error getting admin token:', error.message);
        process.exit(1);
    }
}

async function addDoctors(token) {
    console.log(`📝 Adding ${doctorsData.length} doctors to database...\n`);
    
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < doctorsData.length; i++) {
        const doctor = doctorsData[i];
        const imagePath = path.resolve(__dirname, doctor.imagePath);
        
        try {
            // Create FormData
            const formData = new FormData();
            
            // Add image file
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
            formData.append('image', imageBlob, path.basename(imagePath));
            
            // Add doctor data fields - generate proper email
            const emailName = doctor.name.toLowerCase().replace(/\s+/g, '.').replace(/\./g, '').substring(0, 15);
            const doctorEmail = `${emailName}${i + 1}@mediflow.com`;
            
            formData.append('name', doctor.name);
            formData.append('email', doctorEmail);
            formData.append('password', 'Doctor@123');
            formData.append('speciality', doctor.speciality);
            formData.append('degree', doctor.degree);
            formData.append('experience', doctor.experience);
            formData.append('about', doctor.about);
            formData.append('fees', doctor.fees);
            formData.append('address', JSON.stringify({
                line1: doctor.address1,
                line2: doctor.address2
            }));

            const response = await axios.post(
                `${BACKEND_URL}/api/admin/add-doctor`,
                formData,
                {
                    headers: {
                        'atoken': token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                console.log(`✅ [${i + 1}/${doctorsData.length}] ${doctor.name} added successfully`);
                successCount++;
            } else {
                console.log(`❌ [${i + 1}/${doctorsData.length}] ${doctor.name} failed: ${response.data.message}`);
                failureCount++;
            }
        } catch (error) {
            console.log(`❌ [${i + 1}/${doctorsData.length}] ${doctor.name} error: ${error.message}`);
            failureCount++;
        }

        // Small delay between requests to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 Summary:`);
    console.log(`✅ Successfully added: ${successCount}`);
    console.log(`❌ Failed to add: ${failureCount}`);
    console.log(`${'='.repeat(50)}`);
}

async function main() {
    console.log('🏥 MediFlow - Bulk Doctor Upload\n');
    const token = await getAdminToken();
    await addDoctors(token);
}

main().catch(console.error);
