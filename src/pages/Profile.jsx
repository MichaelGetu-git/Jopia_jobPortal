import React, { useState } from 'react'
import PersonCard from '../components/PersonCard'
import ProfileEdit from '../components/ProfileEdit'
import AboutPerson from '../components/AboutPerson'

const Profile = () => {

  const [personData, setPersonData] = useState({});
  const handlePersonData = (updatedData) => {
    setPersonData(updatedData);
  }
  return (
    <div className='flex h-[800px]'>
       <div className='flex-1 h-screen'>
         <div>
            <div className='pt-5 text-4xl m-6 pl-8 font-semibold'>
              MyProfile
            </div>
            <hr/>
            <div>
            <PersonCard onUpdate = {handlePersonData}/>
            <AboutPerson personData = {personData}/>   
            </div>
         </div> 
      </div>
    </div>
  )
}

export default Profile