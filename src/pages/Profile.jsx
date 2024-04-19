import React, { useState } from 'react'
import PersonCard from '../components/Profile/cards/PersonCard'
import ProfileEdit from '../components/Profile/ProfileEdit'
import AboutPerson from '../components/Profile/cards/AboutPerson'
import Experiences from '../components/Profile/cards/Experiences'
import Educations from '../components/Profile/cards/Educations'
import Portfolio from '../components/Profile/cards/Portfolio'

const Profile = () => {

  const [profileData, setProfiledata] = useState({});

  const handleProfileUpdate = (updatedProfile) => {
      setProfiledata(updatedProfile);
  };

  console.log(profileData);
  return (
    <div className='flex h-[800px]'>
       <div className='flex-1 h-screen'>
         <div>
            <div className='pt-7 text-4xl m-6 pl-36 pr-12 font-semibold'>
              MyProfile
            </div>
            <div>
            <hr className=''/>
            <PersonCard onUpdateProfile= {handleProfileUpdate}/>
            <AboutPerson  profileData={profileData}/>   
            <Experiences profileData={profileData}/>
            <Educations profileData={profileData}/>
            <Portfolio profileData={profileData}/>
            </div>
         </div> 
      </div>
    </div>
  )
}

export default Profile