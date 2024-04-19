import React from 'react'
import InputField from './InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div className='p-2'>
    <h4 className='text-md font-md mb-3 font-bold'>Employment Type</h4>
    <div className=''>
        <div className='relative mb-3 ml-3'>
            <label className='block relative cursor-pointer mb-2 select-none'>
                <input className='absolute cursor-pointer top-1/2 transform -translate-y-1/2 ' type="radio" name='test' id='test' value="" onChange={handleChange} />
                <span className="ml-8 relative bottom-1 text-sm">Any Employment</span>
            </label>
            <InputField handleChange={handleChange} value="temporary" title="Temporary" name="test"/>
            <InputField handleChange={handleChange} value="part-time" title="Part Time" name="test"/>
            <InputField handleChange={handleChange} value="full-time" title="Full Time" name="test"/>
        </div>
    </div>
</div>
  )
}

export default EmploymentType