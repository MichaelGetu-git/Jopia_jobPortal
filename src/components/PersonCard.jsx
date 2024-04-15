import React, { useEffect, useState } from 'react'
import profile from '../img/profilePic.jpg'
import ProfilePG from '../img/profileBackGround.jpg'
import { db } from '../firebase/firebase'
import { doc,getDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import ProfileEdit from './ProfileEdit'
import { FaMapMarkerAlt } from 'react-icons/fa'
import AboutPerson from './AboutPerson'

const PersonCard = ({onUpdate}) => {

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup =() => {
        setIsOpen(!isOpen);
    }

    const [personData, setPersonData] = useState({});

    const handleFormUpdate = (updateFormData) => {
        setPersonData(updateFormData);
        onUpdate(updateFormData)
    }


    
const CoverPhoto = () => (
    <div className='relative h-32 bg-cover bg-center w-full' style={{backgroundImage: `url(${ProfilePG})`}}>
    </div>
);

const ProfilePic = () => (
    <div className='absolute top-12 left-8 transform -translate-y-1.2 h-36 w-36 rounded-full overflow-hidden bg-white'>
        <div className='absolute top-2 left-2 transform -translate-y-1.2 h-33 w-32 rounded-full overflow-hidden'>
            <img src={profile} alt="" className='h-full w-full object-cover'/>
        </div>
    </div>
);


  return (
    <div className='mx-auto max-w-screen-lg p-10 pr-20 pl-40 h-[400px] '>
       <ProfileEdit
        isOpen= {isOpen}
        onClose = {togglePopup}
        onUpdate = {handleFormUpdate}
       />
       <div className='relative h-[300px] border border-gray-300 rounded-sm shadow-inside'>
        <CoverPhoto/>
        <ProfilePic></ProfilePic>
        <div className='flex flex col justify-between pr-12'>
            <div className='pl-44 p-8'>
                <h1 className='font-bold text-2xl capitalize ml-2'>{personData.name}</h1>
                <div className='text-normal text-gray-500 mt-1'>
                <div><p >Current Job Status: <span className='text-black'>{personData.jobName}</span></p></div>
                <div className='flex mt-2'><p className='flex'><span className='mr-2 mt-1'><FaMapMarkerAlt/></span><span className='mt-0'>{personData.location}</span></p></div>
            </div>     
            </div>
            <div className=''>
                <button onClick={togglePopup} className='py-2 px-7 border border-blue border-1 rounded-sm text-blue font-semibold mt-8'>Edit Profile</button>
            </div>
            </div> 
       </div>
    </div>
  )
}

export default PersonCard