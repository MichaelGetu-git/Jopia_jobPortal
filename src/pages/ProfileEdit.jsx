import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { getFirestore, addDoc, collection, setDoc, doc, getDoc,getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthProvider';
import {uploadPortfolio } from '../firebase/personalProfileHandler/FirebaseFunctions'
import { createProfile } from '../Router/ApiRoutes';


const ProfileEdit = () => {

    const token = localStorage.getItem("token");
    const { currentUser } = useAuth();
    const [profileData, setProfileData] = useState({
      name: '',
      phone: '',
      currJobLocation: '',
      aboutMe: '',
      bio: '',
      coverFile: null,
      profileFile: null
    });

    const handleChange = (e) => {
      const { name, value} = e.target;
      setProfileData((prev)=> ({...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setProfileData((prev)=> ({...prev, [name]: files[0]}));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", profileData.name);
      formData.append("phone", profileData.phone);
      formData.append("currJobLocation", profileData.currJobLocation);
      formData.append("aboutMe", profileData.aboutMe);
      formData.append("bio", profileData.bio);

      if (profileData.coverFile) {
        formData.append("coverPicture", profileData.coverFile);
      }

      if (profileData.profileFile) {
        formData.append("profilePicture", profileData.profileFile);
      }

      try {
        createProfile(currentUser.userId, formData, token)
      } catch (error) {
        res.status(500).json({ message: error.message})
      }
    }

    return (
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-10 flex justify-center'>
        <div className='bg-bar py-10 px-4 lg:px-16 w-[80%] rounded:sm'>
        <div className='flex justify-between mx-auto mb-5   border-b-2'>
            <div className='flex justify-center'><h1 className='lg:text-3xl sm:text-1xl md:text-2xl font-bold'>Update Profile</h1></div>
        </div >
              <form onSubmit={handleSubmit} className='space-y-5 '>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Full Name</label>
                <input type="text" name='name'  value={profileData.name} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-full w-full'>
                <label className='block mb-2 text-lg font-semibold'>Personal Bio</label>
                <input type="text" name='bio'  value={profileData.bio} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Phone Number</label>
                <input type="text" name='phone'  value={profileData.phone} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-full w-full'>
                <label className='block mb-2 text-lg font-semibold'>Current Job Location</label>
                <input type="text" name='currJobLocation'  value={profileData.currJobLocation} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              
            </div>
            <div className='w-full'>
                <label className='block mb-2 text-lg font-semibold'>Profile Cover</label>
                <input type="file" name='coverFile' accept='image/*'  onChange={handleFileChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='w-full'>
                <label className='block mb-2 text-lg font-semibold'>Profile Picture</label>
                <input type="file" name='profilePicture' accept='image/*'  onChange={handleFileChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-full w-full'>
                  <label className='block mb-2 text-lg font-semibold'>About Me</label>
                  <textarea name='aboutMe' value={profileData.aboutMe} onChange={handleChange} className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6}
                      placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
                  </textarea>
              </div>
              
              {
                /** 
              <h1 className='text-3xl'>Experience</h1>
              {profileData.experiences && profileData.experiences.map((experience, index)=> (
              <div key={index}>
                  <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Job name</label>
                    <input type="text"
                        name='experience.jobName'
                        value={experience.jobName}
                        onChange={(e)=> handleExperienceChange(index, 'jobName', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Job type</label>
                    <input type="text" 
                        name='experience.jobType'
                        value={experience.jobType}
                        onChange={(e)=> handleExperienceChange(index, 'jobType', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Start Year</label>
                    <input type="date" name='experience.startYear' 
                        value={experience.startYear}
                        onChange={(e)=> handleExperienceChange(index, 'startYear', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>End Year</label>
                    <input type="date" name='experience.endYear'
                        value={experience.endYear}
                        onChange={(e)=> handleExperienceChange(index, 'endYear', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Job Location</label>
                    <input type="text" name='experience.jobLocation' 
                        value={experience.jobLocation}
                        onChange={(e)=> handleExperienceChange(index, 'jobLocation', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Description</label>
                    <textarea name='aboutMe' value={experience.description}
                            onChange={(e)=> handleExperienceChange(index, 'description', e.target.value)}
                          className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6} char
                      placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
                  </textarea>
                  </div>
                </div>
              </div>
              ))}
               <button className='block mt-12 px-5 py-2 bg-white text-blue rounded-sm cursor-pointer border text-bold border-moto border-2' type='button' onClick={handleAddExperienceChange}>Add Experience</button>
               <h1 className='text-3xl'>Educations</h1>
              {profileData.educations && profileData.educations.map((education, index)=> (
              <div key={index}>
                  <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>University Name</label>
                    <input type="text"
                        name='education.uniName'
                        value={education.uniName}
                        onChange={(e)=> handleEducationChange(index, 'uniName', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Degree Level</label>
                    <input type="text" 
                        name='education.degreeLevel'
                        value={education.degreeLevel}
                        onChange={(e)=> handleEducationChange(index, 'degreeLevel', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Start Year</label>
                    <input type="date" name='education.startYear' 
                        value={education.startYear}
                        onChange={(e)=> handleEducationChange(index, 'startYear', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>End Year</label>
                    <input type="date" name='education.endYear'
                        value={education.endYear}
                        onChange={(e)=> handleEducationChange(index, 'endYear', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Study Field</label>
                    <input type="text" name='education.field'
                        value={education.field} 
                        onChange={(e)=> handleEducationChange(index, 'field', e.target.value)}
                        placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                  <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg font-semibold'>Description</label>
                    <textarea name='aboutMe' value={education.description}
                           onChange={(e)=> handleEducationChange(index, 'description', e.target.value)}
                          className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6}
                      placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
                  </textarea>
                  </div>
                </div>
              </div>
              ))}
                
               <button className='block mt-12 px-5 py-2 bg-white text-blue rounded-sm cursor-pointer border text-bold border-moto border-2' type='button' onClick={handleAddEducationChange}>Add Education</button>
               <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                
              </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                <div className='lg:w-1/2 w-full'>
                  <label htmlFor='portfolio' className='block mb-2 text-lg font-semibold'>Portfolio</label>
                  <div className="relative">
                      <input 
                          type="file" 
                          id="portfolio" 
                          name='portfolio.portfolio'
                          onChange={handlePortfolioChange} 
                          multiple
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                      />
                      <button className='block px-5 py-2 bg-white text-blue rounded-sm cursor-pointer border text-bold border-moto border-2' type='button'>
                          Choose File
                      </button>
                  </div>
              </div>
              </div>
               * **/
              }
              <div className='flex justify-end'>
                  <input className='block mt-12 px-7 py-2 bg-blue  text-white text-white rounded:sm cursor-pointer' type='submit' />
              </div>
            </form>
          </div>
      </div>
  )
}

export default ProfileEdit