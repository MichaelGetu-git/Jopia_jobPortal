import React, { useState, useEffect } from 'react'
import Cards from './Cards'
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import JobCard from './JobCard'
import Jobs from './Jobs';
import {useNavigate} from 'react-router-dom'
import arrow from '../img/Category/arrow.svg'

const ExploreCategory = () => {

  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const category = queryparams.get('category');
  const [categoryCounts, setCategoryCounts] = useState({});
 
 
  useEffect(()=> {
    fetch("http://localhost:5000/all-jobs").then(result=>result.json()).then(data => {
      const counts = {};

      data.forEach(job => {
        const category = job.jobType.toLowerCase();
        counts[category] = (counts[category] || 0) + 1;
      });

      setCategoryCounts(counts);
    })
  },[]);

  return (
    <div className='h-110 w-full'>
      <div className='m-14 h-100 bg-bar shadow-custom '>
      <div>
        <nav className='flex justify-between mx-auto p-5 pb-0'>
          <Link className=' md:text-3xl sm:text-1xl lg:text-4xl sm:mt-3 font-bold'><span>Explore </span><span className='text-moto'>Category</span></Link>
          <div className='flex lg:mt-3'>
          <Link to='/allJobs' className='text-blue'>show all Jobs</Link><img src={arrow} className='w-5 h-5 mt-1'/>
          </div>
        </nav>
      </div>
        <div className='w-[85%]'>
            <div className='grid grid-cols-4 gap-8 p-10'>
                {Object.entries(categoryCounts).map(([category, count])=> (
                  <Cards to={`/allJobs?category=${category}`} category = {category} jobCount = {count}/>
                ))}
            </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default ExploreCategory