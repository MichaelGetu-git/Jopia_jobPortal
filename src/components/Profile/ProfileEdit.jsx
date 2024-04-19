import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { getFirestore, addDoc, collection, setDoc, doc, getDoc,getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthProvider';
import {uploadPortfolio } from '../../firebase/personalProfileHandler/FirebaseFunctions'


const ProfileEdit = ({isOpen,onClose, onUpdateProfile}) => {



    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;   
    const [profileData, setProfileData] = useState({
      name: '',
      email: '',
      phone: '',
      location: '',
      aboutMe: '',
      experiences: [],
      educations: [],
      portfolios: [],
    });

    useEffect(()=> {
      const fetchProfileData = async () => {
        try {
          if(!userId) return;

          const userDocRef = doc(db, 'users', userId);
          const docSnapShot = await getDoc(userDocRef);

          if(docSnapShot.exists()) {
            const data = docSnapShot.data();

            setProfileData(data);
            onUpdateProfile(data);
          }
        } catch(error) {
          console.error("ERROR", error);
        }
      };

      fetchProfileData();
    }, [userId]);

    const handleChange = (event) => {
      const {name, value} = event.target;
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleExperienceChange = (index, field, value) => {
      setProfileData((prevData) => {
        const updatedExpirences = [...prevData.experiences];
        updatedExpirences[index][field] = value;

        return {
          ...prevData,
          experiences: updatedExpirences,
        };
      });
    };

    const handleEducationChange = (index, field, value) => {
      setProfileData((prevData)=> {
        const updatedEducations = [...prevData.educations];
        updatedEducations[index][field] = value;

        return {
          ...prevData,
          educations: updatedEducations,
        };
      });
    };

    const handleAddExperienceChange = (index, field, value) => {
      setProfileData((prevData) => {
        const updatedExpirences = Array.isArray(prevData.experiences) ? [...prevData.experiences] : [];
        const newExperience =  {jobName: '', jobType: '', startYear: '', endYear: '', jobLocation: '', description: ''};
        updatedExpirences.push(newExperience);

        return {
          ...prevData,
          experiences: updatedExpirences,
        }
      });
    };
    
    const handleAddEducationChange = () => {
      setProfileData((prevData) => {
        const updatedEducations = Array.isArray(prevData.educations) ? [...prevData.educations] : [];
        const newEducation = { uniName: '', degreeLevel: '', startYear: '', endYear: '', field: '', description: '' };
        updatedEducations.push(newEducation);
    
        return {
          ...prevData,
          educations: updatedEducations,
        };
      });
    };
    const handlePortfolioChange = (event) => {
      const file = event.target.files[0];
      setProfileData((prevData) => {
        const updatedPortfolios = Array.isArray(prevData.portfolios) ? [...prevData.portfolios] : [];
        updatedPortfolios.push(file);
    
        return {
          ...prevData,
          portfolios: updatedPortfolios,
        };
      });
    };
    

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const userDocRef = doc(db , 'users', userId);
        
        if (profileData.portfolios) {
          const { portfolios, ...noPortfolios} = profileData;

          const uploadedPortfolios = await uploadPortfolio(userId, profileData.portfolios);
          const portfolioURLS = uploadedPortfolios.map(portfolio => portfolio.downloadURL);

          const updatedProfileData = { ...noPortfolios, portfolios: portfolioURLS};

          await setDoc(userDocRef, updatedProfileData);
          alert("profile Updated");
        }  else {
          console.error('No portfolios found in profileData');
          alert("No portfolios found in profileData");
      }

      } catch(error) {
        console.error('Error saving user Profile:', error);
        alert(error);
      }
    };



    return (
    <div className={`absolute w-[800px] h-cover justify-center flex left-[25%] bg-opacity-1 bg-white shadow-custom border-gray-300 border-2 scroll rounded-lg ${isOpen ? 'block' : 'hidden'}`} style={{zIndex: 999}}>     
      <div className='max-w-screen-2xl container xl:px-0 px-0 py-0 flex justify-center rounded-lg'>
        <div className='bg-bar py-4 px-4 lg:px-6 w-[100%] rounded:lg'>
        <div className='flex justify-between mx-auto mb-5   border-b-2'>
            <div className='flex justify-center'><h1 className='lg:text-3xl sm:text-1xl md:text-2xl font-bold'>Update Profile</h1></div>
            <div className='flex justify-end right-0 py-2 px-4 bg-white text-red-400 rounded-full font-bold mb-5'><button onClick={onClose} className=''>X</button></div>  
        </div >
              <form onSubmit={handleSubmit} className='space-y-5 '>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Full Name</label>
                <input type="text" name='name'  value={profileData.name} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Email Address</label>
                <input type="email" name='email' value={profileData.email} onChange={handleChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Job Name</label>
                <input type="text" name='jobName'  value={profileData.jobName} onChange={handleChange} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Location</label>
                <input type="text" name='location' value={profileData.location}  onChange={handleChange} placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>About Me</label>
              <textarea name='aboutMe' value={profileData.aboutMe} onChange={handleChange} className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                     rows={6}
                  placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
              </textarea>
            </div>
          </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Phone Number</label>
                <input type="phone" name='phone'  value={profileData.phone} placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
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
                    <input type="Education" name='experience.description'
                        value={experience.description}
                        onChange={(e)=> handleExperienceChange(index, 'description', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
              </div>
              ))}
               <button className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='button' onClick={handleAddExperienceChange}>Add Experience</button>
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
                    <input type="textArea" name='education.description'
                        value={education.description}
                        onChange={(e)=> handleEducationChange(index, 'description', e.target.value)}  
                        placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                        focus:outline-none sm:text-sm sm:leading-6'/>
                  </div>
                </div>
              </div>
              ))}
               <button className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='button' onClick={handleAddEducationChange}>Add Experience</button>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                <div className='lg:w-1/2 w-full'>
                  <label className='block mb-2 text-lg font-semibold'>Portfolio</label>
                  <input type="file" name='portfolio.portfolio'
                      onChange={handlePortfolioChange} 
                      multiple
                      placeholder='Enter your job name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                      focus:outline-none sm:text-sm sm:leading-6'/>
                </div>
              </div>
              <input className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='submit' />
          </form>
          </div>
      </div>
    </div>
  )
}

export default ProfileEdit