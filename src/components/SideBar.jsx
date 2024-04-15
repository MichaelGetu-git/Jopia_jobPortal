import React from 'react'
import Location from './Location'
import Salary from './Salary'
import PostDate from './PostDate'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const SideBar = ({handleChange, handleClick}) => {
  return (
    <div className='space-y-0'>
        <h3 className='text-lg font-bold mb-3 text-center'>Filter Search</h3>
        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} handleClick={handleClick}/>
        <PostDate handleChange={handleChange}/>
        <WorkExperience handleChange={handleChange}/>
        <EmploymentType handleChange={handleChange}/>
    </div>
  )
}

export default SideBar