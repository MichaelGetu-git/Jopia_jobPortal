import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import Jobs from './Jobs'

const FeaturedJobs = ({result}) => {


  return (
    <div className='h-110 w-full'>
      <div className='m-14 h-100 bg-bar shadow-custom '>
      <div>
        <nav className='flex justify-between mx-auto p-5 pb-0'>
          <Link className=' md:text-3xl sm:text-1xl lg:text-4xl sm:mt-3 font-bold'><span>Featured </span><span className='text-moto'>Jobs</span></Link>
          <div className='flex lg:mt-3'>
          <Link className='text-blue-600'>show all Jobs</Link><FiChevronRight className='right-0 text-3xl'/>
          </div>
        </nav>
      </div>
        <div className=''>
          <Jobs result={result}/>
        </div>
      </div>
    </div>
  )
}

export default FeaturedJobs