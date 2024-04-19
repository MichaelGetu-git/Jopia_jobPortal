import React, { useState, useEffect } from 'react'
import PersonCard from '../components/Profile/cards/PersonCard'
import AboutPerson from '../components/Profile/cards/AboutPerson'
import Experiences from '../components/Profile/cards/Experiences'
import Educations from '../components/Profile/cards/Educations'
import Portfolio from '../components/Profile/cards/Portfolio'
import { useAuth } from '../contexts/AuthProvider'
import { db } from '../firebase/firebase'
import { getFirestore, addDoc, collection, setDoc, doc, getDoc,getDocs } from 'firebase/firestore';

const Profile = () => {

  const [profileData, setProfiledata] = useState({});
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;   


  const handleProfileUpdate = (updatedProfile) => {
      setProfiledata(updatedProfile);
  };

  
  useEffect(()=> {
    const fetchProfileData = async () => {
      try {
        if(!userId) return;

        const userDocRef = doc(db, 'users', userId);
        const docSnapShot = await getDoc(userDocRef);

        if(docSnapShot.exists()) {
          const data = docSnapShot.data();

          setProfiledata(data);
        }
      } catch(error) {
        console.error("ERROR", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  
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
            <PersonCard onUpdateProfile= {handleProfileUpdate} profileData={profileData}/>
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