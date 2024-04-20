import React from 'react'

const AboutPerson = ({profileData }) => {

  return (
    <div className='mx-auto max-w-screen-lg pr-56 pl-32 h-[360px] '>
        <div className='relative h-[300px] border border-gray-300 rounded-sm shadow-inside 'style={{ overflowY: 'auto' }}>
            <div className='flex justify-between'>
                <div className='p-6 pl-10 font-bold text-xl'><h1 className=''>About Me</h1></div>
                <div className='p-6 pt-7'>
                <button className='px-4 py-1 border border-red-400 rounded-sm text-moto font-bold'>Edit</button>
                </div>
            </div>
            <div className='p-6 pt-0 pl-16 mx-auto pb-4'>
                {profileData.aboutMe}
            </div>
        </div>
    </div>
  )
}

export default AboutPerson