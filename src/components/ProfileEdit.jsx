import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { getFirestore, addDoc, collection, setDoc, doc, getDoc,getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthProvider';


const ProfileEdit = ({isOpen, onClose, onUpdate}) => {


    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;
    
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      location: '',
      aboutMe: '',
      jobName: '',
      profilePic: null,
      profileCover: null
    });

    useEffect(()=> {
      const fetchUserData = async() => {
        try {
          const userProfileDocRef = doc(db, 'users', 'userProfileData');
          const userProfileSnapshot = await getDoc(userProfileDocRef);

          if(userProfileSnapshot.exists()) {
            const userData = userProfileSnapshot.data();
            setFormData(userData);
          }
        } catch(error) {
          console.error("Error fetching", error);
        }
      }
        if(userId) {
          fetchUserData();
        }

    }, [userId]);

    const [storedData, setStoredData] = useState([]);
   
    useEffect(()=> {
      const getUserData = async() => {
        const userProdileDocRef = doc(db, 'users', userId);
        const userProdileDocSnap = await getDoc(userProdileDocRef);
 
        if(userProdileDocSnap.exists()) {
         const profileData = userProdileDocSnap.data();
         setStoredData(profileData);
 
         onUpdate(profileData);
        } else {
         console.log("profile not found");
        }
     };
      if (userId) {
        getUserData();
      }
    }, [userId], onUpdate);


    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]:value
      }));
    };

    const handleFileChange = (e) => {
      const {name, files} = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const userProfileDocRef = doc(db, 'users', userId);
        await setDoc(userProfileDocRef, formData);
        onUpdate(formData);
      } catch(error) {
        console.error("error", error);
      }
    };

    return (
    <div className={`absolute w-[700px] h-full flex left-[20%] bg-opacity-1 bg-white  scroll rounded:lg ${isOpen ? 'block' : 'hidden'}`} style={{zIndex: 999}}>     
      <div className='max-w-screen-2xl container xl:px-0 px-0 py-0 flex justify-center rounded-lg'>
        <div className='bg-bar py-4 px-4 lg:px-6 w-[100%] rounded:lg'>
        <div className='flex justify-between mx-auto mb-5'>
            <div className='flex justify-center'><h1 className='lg:text-3xl sm:text-1xl md:text-2xl font-bold'>Update Profile</h1></div>
            <div className='flex justify-end right-0 py-2 px-4 bg-white text-red-400 rounded-full font-bold'><button onClick={onClose} className=''>X</button></div>  
        </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Full Name</label>
                <input type="text" name='name' value={storedData.name} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Email Address</label>
                <input type="email" name='email' value={storedData.email} onChange={handleChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Job Name</label>
                <input type="text" name='jobName' value={storedData.jobName} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Location</label>
                <input type="text" name='location' value={storedData.location} onChange={handleChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>About Me</label>
              <textarea name='aboutMe' value={storedData.aboutMe} onChange={handleChange} className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                     rows={6}
                  placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
              </textarea>
            </div>
          </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Phone Number</label>
                <input type="phone" name='phone' value={storedData.phone} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Profile Pic</label>
                <input type="file" name='profilePic' onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Cover Photo</label>
                <input type="file" name='profileCover'  onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <input className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='submit'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit