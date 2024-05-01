import React, { useState } from 'react'

const Educations = ({profileData}) => {

  const [showAllEducations, setShowAllEducations] = useState(false);
  const [isExpanded,setIsExpanded] = useState(null);
  const numOfEducations = profileData.educations ? profileData.educations.length : 0;


  const toggleDescription = id => {
    if(isExpanded ===id) {
      setIsExpanded(null);
    } else {
      setIsExpanded(id);
    }
  }
  return (
    <div className='mx-auto max-w-screen-lg pr-52 pl-32 h-[360px] '>
        <div className='relative h-[335px] border border-gray-300 rounded-sm shadow-inside' style={{ overflowY: 'auto' }}>
            <div className='flex justify-between'>
                <div className='p-4 font-bold text-xl'><h1 className=''>Educations</h1></div>
            </div>
            {profileData.educations && profileData.educations.map((education, index) => (
              <div key={index} className={`p-4 pt-0 pl-8 ${index ===0 || showAllEducations ? '' : 'hidden'}`}>
                <div className='grid grid-cols-4 gap-1'>
                  <div className="col-span-1">
                    <div className='bg-moto w-24 h-24 rounded-full ml-4'></div>
                  </div>
                  <div className='col-span-3 mt-2'>
                    <h1 className='font-bold'>{education.uniName}</h1>
                    <div className='grid grid-cols'>
                      <span  className='text-gray-500 ml-0 mt-2'>{education.degreeLevel} | <span>{education.field}</span></span>
                      <span className='text-gray-500 ml-0 mt-2'>{education.startYear} - {education.endYear}</span>
                      <div className='mt-3 text-gray-500 cursor-pointer' 
                          onClick={()=> toggleDescription(index)}>
                        <p className={isExpanded === index ? '' : 'line-clamp-3'}>{education.description}</p>
                          {isExpanded !== index && <span className='text-blue'>...</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-3 border-t-2'>
                  <button className='w-full py-1 rounded-sm text-blue font-bold mt-1'
                          onClick={()=> setShowAllEducations(!showAllEducations)}>
                        {showAllEducations ? 'Show Less' : `show All ${numOfEducations} Educations`}
                  </button>
                </div>
              </div>
            ))}
         </div>
    </div>
  )
}

export default Educations