import React from 'react';
import InputField from './InputField';

const Location = ({ handleChange }) => {
  return (
    <div className='p-2'>
      <div className='text-md font-md mb-3 font-bold'>Location</div>
      <div className='relative mb-3 ml-3'>
        <label className='block relative cursor-pointer mb-2 select-none'>
          <input className='absolute cursor-pointer top-1/2 transform -translate-y-1/2 ' type="radio" name='test' id='test' value="" onChange={handleChange} />
            <span className="ml-8 relative bottom-1 text-sm">All</span>
        </label>
        <InputField handleChange={handleChange} value="london" title="London" name="test"/>
        <InputField handleChange={handleChange} value="seattle" title="Seattle" name="test"/>
        <InputField handleChange={handleChange} value="madrid" title="Madrid" name="test"/>
        <InputField handleChange={handleChange} value="boston" title="Boston" name="test"/>
      </div>
    </div>
  );
};

export default Location;
