import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate }from 'react-router-dom'
import AllJobs from '../pages/AllJobs';
import designLogo from '../img/company-logo@2x.png'


const Cards = ({to, category, jobCount}) => {
 
    return ( 
        <div className=''>
          <Link to={to}>
            <div className='w-full h-48 rounded-sm shadow-md bg-white hover:bg-moto hover:text-white border shadow-inside '> 
              <div className='grid grid-rows-3 mx-auto p-5 mt-[7%] ml-[5%]'>
                  <div className='ml-[10%] mx-auto w-10 h-8 '><img src={designLogo} alt="" /></div>
                  <div className='mt-3 ml-2 text-capitalize ' ><h2 className='font-bold text-md' style={{ textTransform: 'capitalize' }}>{category}</h2></div>
                  <div className='flex'>
                  <div className='col-span-3 ml-1'>
                      <p className='mt-2.5 text-primary text-sm'>{jobCount} jobs available</p>
                  </div>
                  <div className='flex items-center justify-start ml-2' >
                      <img src={designLogo} alt="" className='w-4 h-4'/>
                  </div>
              </div>
              </div>    
            </div>
          </Link>
        </div>
    );
    };

export default Cards