import React from 'react';
import { FiMapPin, FiSearch, FiChevronDown } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className='justify-center mx-20 bg-bar rounded-lg shadow-custom p-4'>
      <form action="">
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4 w-full py-3 px-20'> 
          <div className='relative w-full lg:ml-10'>
            <select
              name='title'
              id='title'
              className='block appearance-none bg-transparent border py-3 pl-8 pr-4 text-gray-900 sm:text-sm sm:leading-6 focus:outline-none w-full'
              >
              <option value="">Select Position</option>
              <option value="position1">Position 1</option>
              <option value="position2">Position 2</option>
              <option value="position3">Position 3</option>
            </select>
            <div className='absolute inset-y-0 right-4 flex items-center pl-2 pointer-events-none'>
                <FiChevronDown className='text-gray-500 text-xl' />
            </div>
          </div>
          <div className='relative w-full'>
            <select
              name='location'
              id='location'
              className='block appearance-none bg-transparent border py-3 pl-8 pr-4 text-gray-900 sm:text-sm sm:leading-6 focus:outline-none w-full'
            >
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            <div className='absolute inset-y-0 right-2 flex items-center pl-2 pointer-events-none'>
                <FiChevronDown className='text-gray-500 text-xl' />
                
            </div>
          </div>
          <button type='submit' className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded lg:mr-7'>
              Filter
          </button>  
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
