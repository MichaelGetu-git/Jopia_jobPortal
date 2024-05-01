import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import PostedJobs from '../components/PostedJobs';
import AppliedJobs from '../components/AppliedJobs';
const MyJobs = () => {


    const [activeMenuItem, setActiveMenuItem] = useState("Applied Jobs");

    const handleMenuItemCheck = (title, path, event)=> {
      if(title === "Posted Jobs" || title === "Applied Jobs") {
        event.preventDefault();
      }
      setActiveMenuItem(title);
    };

    const MenuItems = [
      {title: "Applied Jobs", path: "/"},
      {title: "Posted Jobs", path: "/"}
    ]

    return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 rounded:md mt-10'>
         <div className='pt-24 text-4xl m-6 pl-36 pr-12 font-semibold'>
              My Jobs
            </div>
            <div>
         </div>
         <hr className=''/>
         <div>
          <ul className='flex flex-row p-4 mr-5'>
            {MenuItems.map(({path, title})=> (
              <li className='mr-5 font-bold text-xl text-gray-400'>
                <NavLink to={path} className={`${activeMenuItem === title ? 'text-red-600': ''}`} onClick = {(event)=>handleMenuItemCheck(title, path, event)}>
                  <span>{title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <hr className=''/>
        <div className='flex-grow'>
          {activeMenuItem === 'Posted Jobs' && <PostedJobs/>}
          {activeMenuItem === 'Applied Jobs' && <AppliedJobs />}
        </div>
    </div>
  )
}

export default MyJobs