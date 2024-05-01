import React, {useState} from 'react'

const AboutPerson = ({profileData }) => {

  const [isExpanded,setIsExpanded] = useState(false);
  
  
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  }
  return (
    <div className='mx-auto max-w-screen-lg pr-52 pl-32 h-[360px] '>
        <div className='relative h-[330px] border border-gray-300 rounded-sm shadow-inside 'style={{ overflowY: 'auto' }}>
            <div className='flex justify-between' >
                <div className='p-10 pl-10 font-bold text-xl'><h1 className=''>About Me</h1></div>
                <div className='p-6 pt-7'>
                <button className='px-4 py-1 border border-red-400 rounded-sm text-moto font-bold'>Edit</button>
                </div>
            </div>
            <div className='p-7 pt-2 pl-20 mx-auto pb-4 cursor-pointer'>

                <p className={`${isExpanded ? '' : 'line-clamp-6'} overflow-hidden text-gray-500`}>{profileData.aboutMe}</p>
                  <span onClick={toggleDescription} className='text-blue cursor-pointer font-bold'>
                    {isExpanded ? '....less' : '...more'}
                  </span>
            </div>
        </div>
    </div>
  )
}

export default AboutPerson