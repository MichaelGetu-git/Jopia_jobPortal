import React from 'react'
import pic from '../img/motoRight.png'

const SiteMoto = () => {
  return (
    <div className='py-12 px-5'>
      <div className='container mx-auto flex flex-col items-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-center md:text-left'>
          <span className='block md:inline'>Discover more </span>
          <span className='text-moto text-4xl md:text-5xl md:block'>than 5000+ jobs</span>
        </h1>
        <div className='flex-grow md:flex-none md:mt-4 md:ml-6'>
          <img src={pic} alt="logo_bar" className="w-64 md:w-96 lg:w-[410px]" />
        </div>
      </div>
    </div>
  )
}

export default SiteMoto
