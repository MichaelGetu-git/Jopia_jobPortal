import React from 'react'

const AboutPerson = ({personData}) => {
  return (
    <div className='mx-auto max-w-screen-lg p-10 pr-20 pl-40 h-[400px] '>
        <div className='relative h-[300px] border border-gray-300 rounded-sm shadow-inside'>
            <div className='flex justify-between'>
                <div className='p-10 font-bold text-xl'><h1 className=''>About Me</h1></div>
                <div className='p-10 pt-7'>
                <button className='px-4 py-1 border border-red-400 rounded-sm text-moto font-bold'>Edit</button>
                </div>
            </div>
            <div className='p-6 pt-1 pl-8'>
                {personData.aboutMe}
            </div>
        </div>
    </div>
  )
}

export default AboutPerson