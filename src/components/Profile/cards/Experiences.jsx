import React, { useState } from 'react'

const Experiences = ({profileData}) => {

  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const numOfExperience = profileData.experiences ? profileData.experiences.length : 0;


  return (
    <div className='mx-auto max-w-screen-lg pr-56 pl-32 h-[360px] ' >
        <div className='relative h-[320px] border border-gray-300 rounded-sm shadow-inside 'style={{ overflowY: 'auto' }}>
            <div className='flex justify-between'>
                <div className='p-4 font-bold text-xl'><h1 className=''>Experiences</h1></div>
            </div>
            <div className='overflow-y-auto' >
            {profileData.experiences && profileData.experiences.map((experience, index) => (
              <div key={index}  className={`p-4 pt-0 pl-8 ${index === 0 || showAllExperiences ? '' : 'hidden'}`}>
                  <div className='grid grid-cols-4 gap-1'>
                    <div className='col-span-1'>
                      <div className='bg-moto w-24 h-24 rounded-full ml-4'></div>
                    </div>
                    <div className='col-span-3 mt-4'>
                      <h1 className='font-bold'>{experience.jobName}</h1>
                      <div className='grid grid-cols'>
                        <span>{experience.jobLocation} | <span className='text-gray-500'>{experience.jobType} | <span>{experience.startYear} - {experience.endYear}</span></span></span>
                        <span className='text-gray-500'>{experience.jobLocation}</span>
                        <div className='mt-3 text-gray-500' style={{ overflowY: 'auto' }}>
                        <p>{experience.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-8 border-t-2 '>
                <button className='w-full py-1  rounded-sm text-blue font-bold mt-1'
                        onClick={()=> setShowAllExperiences(!showAllExperiences)}>
                    {showAllExperiences ? 'Show Less' : `Show All ${numOfExperience} Experiences`}
                </button>
                </div>
          
              </div>
              
            ))}
            </div>
        </div>
    </div>  
  )
}

export default Experiences