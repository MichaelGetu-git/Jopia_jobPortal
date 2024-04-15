import {FiMapPin, FiSearch} from 'react-icons/fi'

const SearchBar = ({query, handleInputChange}) => {


  return (
    <div className='justify-center mx-20 p-5 pl-10'>
      <form action="">
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'> 
        <div className='flex md:rounded-s-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2
                focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
            <input type="text" name='title' id='title'
              placeholder='What position are you looking for?' 
              className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-grey-900
               placeholder:text-grey-400 focus:right-0 sm:text-sm sm:leading-6'
               onChange={handleInputChange}
               value={query}
               />
                <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>
          </div>
          <div className='flex md:rounds-md shadow-sm ring-1 ring-inset ring-gray-300 focus:within:ring-2
                focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
            <input type="text" name='title' id='title'
              placeholder='Location' 
              className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-grey-900
               placeholder:text-grey-400 focus:right-0 sm:text-sm sm:leading-6'
               value={""}
               />
                <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400'/>
          </div>
          <button type='submit' className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded'>
                Search
          </button>  
        </div>
      </form>
    </div>
  )
}

export default SearchBar