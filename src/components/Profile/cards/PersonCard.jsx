import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultprofile from '../../../img/profileBackGround.jpg'
import ProfileEdit from '../../../pages/ProfileEdit'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase/firebase'
import { useAuth } from '../../../contexts/AuthProvider'
import edit from '../../../img/Category/edit.svg'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'
import {  getProfile, updateCoverPicture, updateProfile, updateProfilePicture } from '../../../Router/ApiRoutes'
const PersonCard = ({ onUpdateProfile, profileData }) => {

    const token = localStorage.getItem("token");
    const { currentUser } = useAuth();
    const useNav = useNavigate();
    const userId = currentUser ? currentUser.uid : null;
    const profilePic = profileData.profilePicture
    const coverPic = profileData.coverPicture
    const [isUploading, setIsUploading] = useState(false);
    const [userProfile, setUserProfile] = useState({
        profileFile: null,
        coverFile: null,
    });

    const profilePicRef = useRef(null);
    const coverPicRef = useRef(null);

    const handleProfileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserProfile((prevData) => ({
            ...prevData,
            profileFile: file,
        }));
        uploadData({profileFile: file})
        }
    }


    const handleCoverChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setUserProfile((prevData) => ({
            ...prevData,
            coverFile: file,
        }));
        uploadData({coverPicture: file});
        }

    }

    const handleClick = () => {
        useNav('/profileEdit');
    };

    const uploadData = async () => {
        const formDataOne = new FormData();
        const formDataTwo = new FormData();

        if (userProfile.profileFile) {
            formDataOne.append("profilePicture", userProfile.profileFile);
        }
        if (userProfile.coverFile) {
            formDataTwo.append("coverPicture", userProfile.coverFile);
        }
        try {
            if (userProfile.profileFile) {
                const profilePic = await updateProfilePicture(formDataOne, token);
                console.log(profilePic);
            }
            if (userProfile.coverFile) {
                const coverPic = await updateCoverPicture(formDataTwo, token);
                console.log(coverPic);
            }
        } catch (error) {
            return error.message;
        } 
    }
    console.log(profileData)
    const CoverPhoto = () => (

        <div className='flex justify-end relative h-32 bg-cover bg-center w-full' style={{ backgroundImage: `url(${coverPic || defaultprofile})` }}>
            <div className='p-5'>
                <button >
                    <div
                        onClick={() => coverPicRef.current.click()}
                        className='items-center justify-center rounded-full bg-opacity-50 hover:bg-opacity-70 transition duration-300'>
                        <div className='w-12 h-12 border border-gray-400 border-2 rounded-sm flex items-center justify-center'>
                            <img src={edit} alt="" className='w-7 h-7' />
                        </div>
                    </div>
                </button>
                <input ref={coverPicRef} type="file" accept='image/*' className='hidden' onChange={handleCoverChange} />
            </div>
        </div>
    );

    const ProfilePic = () => (
        <div className='absolute top-12 left-8 transform -translate-y-1.2 h-36 w-36 rounded-full overflow-hidden bg-white'>
            <div className='absolute top-2 left-2 transform -translate-y-1.2 h-32 w-32 rounded-full overflow-hidden'>
                <img src={profilePic ||  defaultprofile} alt="" className='h-full w-full object-cover' />
                <button
                    onClick={() => profilePicRef.current.click()}
                    className='absolute bottom-4 right-2 transform -translate-y-1.2 overflow-hidden ' >
                    <img src={edit} alt="" className='w-7 h-7 ' />
                </button>
                <input type="file" ref={profilePicRef} accept='image/*' className='hidden' onChange={handleProfileChange} />
                <div>
                </div>
            </div>
        </div>
    );


    return (
        <div className='mx-auto max-w-screen-lg pt-10 pr-52 pl-32 h-[400px] '>
            <div className='relative h-cover border border-gray-300 rounded-sm shadow-inside'>
                <CoverPhoto />
                <ProfilePic></ProfilePic>
                <div className='flex flex col justify-between pr-12'>
                    <div className=' p-5'>
                        <h1 className='font-bold text-2xl capitalize ml-2 pl-36'>{profileData.name}</h1>
                        <div className='text-normal text-gray-600 mt-1 pl-36'>
                            <div><p >{profileData.jobName} at<span className='text-black'> {profileData.currJobLocation}</span></p></div>
                            <div className='flex mt-2'><p className='flex'><span className='mr-2 mt-1'><FaMapMarkerAlt /></span><span className='mt-0'>{profileData.location}</span></p></div>
                        </div>
                        <div className='flex pl-20 pl-10 pt-5'><FaQuoteLeft />{profileData.bio}<FaQuoteRight /></div>
                    </div>
                    <div className=''>
                        <button onClick={handleClick} className='py-2 px-7 border border-blue border-1 rounded-sm text-blue font-semibold mt-8 cursor-pointer'>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonCard