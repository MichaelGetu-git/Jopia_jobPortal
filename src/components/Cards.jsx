import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate }from 'react-router-dom'
import AllJobs from '../pages/AllJobs';
import first from '../img/Category/first.svg'
import sec from '../img/Category/sec.svg'
import third from '../img/Category/third.svg'
import four from '../img/Category/forth.svg'
import five from '../img/Category/fifth.svg'
import six from '../img/Category/sixth.svg'
import sev from '../img/Category/seven.svg'
import eight from '../img/Category/eight.svg'
import arrow from '../img/Category/arrow.svg'

const icons= {
  'design' : first,
  'sales' : sec,
  'marketing' : third,
  'finance' : four,
  'technology' : five,
  'engineering': six,
  'human resources' : sev,
  'bussiness' : eight  
}


const Cards = ({to, category, jobCount}) => {
 
    const categoryIcon = icons[category];
    return ( 
        <div className=''>
          <Link to={to}>
            <div className='w-full h-48 rounded-sm shadow-md bg-white hover:bg-blue hover:text-white border shadow-inside '> 
              <div className='grid grid-rows-3 mx-auto p-5 mt-[7%] ml-[5%]'>
                  <div className='ml-[10%] mx-auto w-10 h-8 '><img src={categoryIcon} alt="" className='svg-path'/></div>
                  <div className='mt-3 ml-2 text-capitalize ' ><h2 className='font-bold text-md' style={{ textTransform: 'capitalize' }}>{category}</h2></div>
                  <div className='flex'>
                  <div className='col-span-3 ml-1'>
                      <p className='mt-2.5 text-primary text-sm'>{jobCount} jobs available</p>
                  </div>
                  <div className='flex items-center justify-start mt-2' >
                      <img  src={arrow}  alt="" className='w-6 h-5'/>
                  </div>
              </div>
              </div>    
            </div>
          </Link>
        </div>
    );
    };

export default Cards