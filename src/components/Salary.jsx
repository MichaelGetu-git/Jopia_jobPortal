import React from 'react'
import InputField from './InputField'

const Salary= ({handleChange, handleClick}) => {
  const someVal = null;
  return (
    <div className='p-2'>
        <h4 className='text-md font-md mb-3 font-bold'>Salary</h4>
        <div className='ml-3'>
        <label className='block relative cursor-pointer mb-2 select-none'>
            <input className='absolute cursor-pointer top-1/2 transform -translate-y-1/2 text-sm font-sm' type="radio" name='test' id='test' value={someVal} onChange={handleChange} />
                <span className="ml-8 relative bottom-1 text-sm">All</span>
            </label>
            <InputField handleChange={handleChange} value={30} title="< 30000k" name="test"/>
            <InputField handleChange={handleChange} value={50} title="< 50000k" name="test"/>
            <InputField handleChange={handleChange} value={80} title="< 80000k" name="test"/>
            <InputField handleChange={handleChange} value={100} title="< 100000k" name="test"/>
        </div>
    </div>
  )
}

export default Salary