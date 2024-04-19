import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultprofile from '../../../img/profileBackGround.jpg'
import ProfileEdit from '../../../pages/ProfileEdit'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {db, storage } from '../../../firebase/firebase'
import { useAuth } from '../../../contexts/AuthProvider'
import { fetchCoverPic, uploadCoverPicture, uploadProfilePicture,fetchProfilePic } from '../../../firebase/personalProfileHandler/FirebaseFunctions'
const PersonCard = ({onUpdateProfile, profileData}) => {

    
    const { currentUser } = useAuth();
    const useNav = useNavigate();
    const userId = currentUser ? currentUser.uid : null;  
    const [userProfile, setUserProfile] = useState({
        profilePictureURL: '',
        coverPictureURL: '',

    });

    const profilePicRef = useRef(null);
    const coverPicRef = useRef(null);

    const handleProfileChange = async(e) => {
        const file = e.target.files[0];
        const profilePictureURL = await uploadProfilePicture(userId, file);
        setUserProfile((prevData)=> ({
            ...prevData,
            profilePictureURL: profilePictureURL
        }))
    }


   const handleCoverChange = async(e) => {
    const file = e.target.files[0];
    const coverPictureURL = await uploadCoverPicture(userId, file);
    setUserProfile((prevData)=> ({
        ...prevData,
        coverPictureURL: coverPictureURL,
    }))
   }

   useEffect(()=> {
    const fetchData = async() => {
        const profilePic = await fetchProfilePic(userId);
        const coverPic = await fetchCoverPic(userId);
        setUserProfile({
            profilePictureURL: profilePic,
            coverPictureURL: coverPic,
        });
    };

    fetchData();
   }, [userId]);

   const handleClick = () => {
    useNav('/profileEdit');
    };

    
const CoverPhoto = () => (
      
    <div className='flex justify-end relative h-32 bg-cover bg-center w-full' style={{backgroundImage: `url(${userProfile.coverPictureURL || defaultprofile})`}}>
        <div className='p-5'>
            <button >
                <div 
                    
                    onClick={() => coverPicRef.current.click()}
                    className='items-center justify-center rounded-full bg-opacity-50 hover:bg-opacity-70 transition duration-300'>
                    <FaPlus className='text-4xl text-white'/>
                </div>
            </button>
            <input ref={coverPicRef} type="file" accept='image/*' className='hidden' onChange={handleCoverChange}/>
        </div>
    </div>
);

const ProfilePic = () => (
    <div className='absolute top-12 left-8 transform -translate-y-1.2 h-36 w-36 rounded-full overflow-hidden bg-white'>
        <div className='absolute top-2 left-2 transform -translate-y-1.2 h-32 w-32 rounded-full overflow-hidden'>
            <img src={userProfile.profilePictureURL || defaultprofile}  alt="" className='h-full w-full object-cover'/>
            <button 
                onClick={() => profilePicRef.current.click()}
                className='absolute bottom-4 right-6 transform -translate-y-1.2 overflow-hidden' >
                <FaPlus className='text-3xl text-white'/>    
            </button>
            <input type="file"  ref={profilePicRef} accept='image/*' className='hidden'  onChange={handleProfileChange}/>
            <div>
            </div>
        </div>
        
    </div>
);


  return (
    <div className='mx-auto max-w-screen-lg pt-10 pr-56 pl-32 h-[400px] '>
        <div className='relative h-[330px] border border-gray-300 rounded-sm shadow-inside'>
            <CoverPhoto/>
        <ProfilePic></ProfilePic>
        <div className='flex flex col justify-between pr-12'>
            <div className='pl-44 p-8'>
                <h1 className='font-bold text-2xl capitalize ml-2'>{profileData.name}</h1>
                <div className='text-normal text-gray-500 mt-1'>
                <div><p >Current Job Status: <span className='text-black'>{profileData.jobName}</span></p></div>
                <div className='flex mt-2'><p className='flex'><span className='mr-2 mt-1'><FaMapMarkerAlt/></span><span className='mt-0'>{profileData.location}</span></p></div>
            </div> 
            </div>
            <div className=''>
                <button onClick={handleClick}  className='py-2 px-7 border border-blue border-1 rounded-sm text-blue font-semibold mt-8 cursor-pointer'>Edit Profile</button>
            </div>
            </div> 
       </div>
    </div>
  )
}

export default PersonCard