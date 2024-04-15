import React from 'react'
import { Link } from 'react-router-dom';
import { FiCalendar, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';

const jobCard = ({data}) => {

  const {companyName,companyLogo, jobTitle,minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate,description} = data;
  
  return (
    <div>
      <section className='m-3 border border-gray-300 shadow-custom p-2 cursor-pointer'>
        <Link to={"/"} className="flex gap-4 flex-col sm:flex-row items-start">
            <img src={companyLogo} alt="" className='w-20 h-13'/>
            <div>
                <h4 className='text-primary mb-1 ml-2'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
                <div className='text-gray-700 text-base flex flex-wrap gap-2 mb-2'>
                  <span className='flex items-center gap-2'><FiMapPin/>{jobLocation}</span>
                  <span className='flex items-center gap-2'><FiClock/>{employmentType}</span>
                  <span className='flex items-center gap-2'><FiDollarSign/>{minPrice}-{maxPrice}k</span>
                  <span className='flex items-center gap-2'><FiCalendar/>{postingDate}</span>
                </div>
                <div style ={{ textAlign: 'justify',}}>
                <p className='text-gray-700'>{description}</p>
                </div>
            </div>
        </Link>
      </section>
    </div>
  )
}

export default jobCard