import React from 'react';

const InputField = ({ handleChange, value, title, name }) => {
    
  return (
    <label className='block relative cursor-pointer mb-2 select-none'>
      <input
        className='absolute cursor-pointer top-1/2 transform -translate-y-1/2'
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
      />
      <span className='ml-8 relative bottom-1 text-sm'>{title}</span>
    </label>
  );
};

export default InputField;
