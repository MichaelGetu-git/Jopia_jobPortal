import React from 'react'
import InputField from './InputField'


const WorkExperience = ({handleChange}) => {
  return (
    <div className='p-2'>
    <h4 className='text-md font-md mb-3 font-bold'>Experience Level</h4>
    <div className=''>
        <div className='relative mb-3 ml-3'>
            <label className='block relative cursor-pointer mb-2 select-none'>
                <input className='absolute cursor-pointer top-1/2 transform -translate-y-1/2 ' type="radio" name='test' id='test' value="" onChange={handleChange} />
                <span className="ml-8 relative bottom-1 text-sm">Any Experience</span>
            </label>
            <InputField handleChange={handleChange} value="internship" title="Internship" name="test"/>
            <InputField handleChange={handleChange} value="work remotely" title="Remote Work" name="test"/>
        </div>
    </div>
</div>

  )
}

export default WorkExperience