import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer>
        <div className='bg-blue text-white h-64'>
            <div className='grid grid-cols-3'>
                <div className='col-span-1 mx-auto mt-[20%] '>
                  <div className='flex justify-start ml-20 sm:text-base'>
                  <p className=' lg:text-white'>Great platform for the job seekers passionate
                    about startups and finding there dream job.
                  </p>
                  </div>
                </div>
                <div className='col-span-2 text-white p-4 ml-5'>
                  <ul ><h1 className='font-bold mt-10'>About</h1>
                    <div className='ml-6 p-2'>
                        <li className='hover:underline hover:red-400 font-light mb-1'><Link>Advice</Link></li>
                        <li className='hover:underline hover:red-400 font-light mb-1'><Link>Terms and Policies</Link></li>
                        <li className='hover:underline hover:red-400 font-light mb-1'><Link>Customer Support</Link></li>
                    </div>
                  </ul>
                </div>
            </div>
            <div className='flex'>
                <div className='justify-left'>
                  <p className='flex justify-center'>@2024 JoPia ~ jobs in ethiopia platform</p>
                </div>
                <div className='flex ml-[70%] p-4'>
                  <Link>Facebook</Link>
                  <Link>Twitter</Link>
                </div>
            </div>
        </div>        
      </footer>
  )
}

export default Footer