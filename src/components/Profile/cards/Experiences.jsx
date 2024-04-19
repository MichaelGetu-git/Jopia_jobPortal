import React from 'react'

const Experiences = ({profileData}) => {
  return (
    <div className='mx-auto max-w-screen-lg pr-56 pl-32 h-[360px] '>
        <div className='relative h-[330px] border border-gray-300 rounded-sm shadow-inside'>
            <div className='flex justify-between'>
                <div className='p-10 font-bold text-xl'><h1 className=''>Experiences</h1></div>
                <div className='p-10 pt-7'>
                <button className='px-4 py-1 border border-red-400 rounded-sm text-moto font-bold'>Edit</button>
                </div>
            </div>
            {Array.isArray(profileData.experiences)&& profileData.experiences.map((experience, index) => (
              <div key={index} className='p-6 pt-1 pl-8'>
                  <h1>{experience.jobName}</h1>
                  <span></span>
              </div>
            ))}
            
        </div>
    </div>  
  )
}

export default Experiences