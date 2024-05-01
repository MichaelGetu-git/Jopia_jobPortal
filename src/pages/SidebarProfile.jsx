import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../img/icons/home.png';
import ApplicationIcon from '../img/icons/forms.png';
import FindJobsIcon from '../img/icons/search.png';
import ProfileIcon from '../img/icons/user.png';
import SettingsIcon from '../img/icons/settings.png';
import HelpIcon from '../img/icons/help.png';
import LogOutIcon from '../img/icons/exit.png';
import { doSignOut } from '../firebase/auth';
import { useAuth } from '../contexts/AuthProvider';
import Settings from './Settings'; 
import Profile from './Profile'; 
import MyJobs from './MyJobs';

const SidebarProfile = () => {
    const { userLoggedIn } = useAuth();
    const [activeMenuItem, setActiveMenuItem] = useState("Public Profile");


    const handleMenuItemClick = (title, path, event) => {
        if (title === "Public Profile" || title === "Settings" || title === "My Jobs") {
            event.preventDefault();
        }
        setActiveMenuItem(title);
    };


    const MenuItems = [
        { title: "Dashboard", path: "/", icon: DashboardIcon },
        { title: "My Applications", path: "/myJobs", icon: ApplicationIcon },
        { title: "Find Jobs", path: "/allJobs", icon: FindJobsIcon },
        { title: "My Jobs", path: "/myJobs", icon: FindJobsIcon},
        { title: "Public Profile", path: "/profile", icon: ProfileIcon },
        { title: "Settings", path: "/settings", gap: true, icon: SettingsIcon },
        { title: "Help Center", path: "/", icon: HelpIcon }
    ];

    return (
        <div className=' p-5 flex lg:h-[1650px]'>
            <div className='w-100 pt-5'>
                <div>
                    <h1 className=' text-blue text-5xl font-bold pt-9 pb-2 px-14'>JoPia</h1>
                </div>
                <div className='flex gap-x-4 items-left pt-10'>
                    <ul className='text-gray-400'>
                        {MenuItems.map(({ path, title, gap, icon }) => (
                            <li key={title} className={`text-md flex items-left mb-0  ${gap ? "border-t border-gray-300 mt-5" : "mt-2"} hover:bg-[#CCCCF5] hover:text-blue rounded-sm`}>
                                {gap ? (
                                    <div className="">
                                        <div className='mb-4 w-72 hover:text-gray-300 bg-white pointer-events-none'>
                                            <h1 className='font-semibold px-7 p-4 pb-2 pointer-events-none'>Settings</h1>
                                        </div>
                                        <div className='w-72 flex flex-col cursor-pointer py-2 px-10 mb-0 font-semibold'>
                                            <NavLink to={path} className={`flex items-start ${activeMenuItem === title ? 'text-red-600 bg-[#CCCCF5]' : ''}`} onClick={(event) => handleMenuItemClick(title, path, event)}  >
                                                <div className='flex items-start'>
                                                    <img className='w-6 h-6 text-blue mr-3' src={icon} alt={`${title} icon`} />
                                                    <span>{title}</span>
                                                </div> 
                                            </NavLink>
                                        </div>
                                    </div>                           
                                ) : (
                                    <NavLink to={path} className= {`${activeMenuItem === title ? 'text-red-600 bg-[#CCCCF5]' : ''}`} onClick={(event) => handleMenuItemClick(title, path, event)}>
                                        <div className="w-72 flex items-start  py-2 px-10 mb-0 font-semibold"> 
                                            <img className='w-6 h-6 text-blue mr-3' src={icon} alt={`${title} icon`} />
                                            <span>{title}</span> 
                                        </div>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {userLoggedIn ? (
                    <button onClick={doSignOut} className='flex px-14 py-4 m-7 border border-gray-300 text-red-600 font-semibold rounded-md'>
                        <img src={LogOutIcon} alt="" className='w-7 h-7 mr-3 ml-0'/>
                        <span>Logout</span>
                    </button>
                ) : ("")}    
            </div>
            <div className='flex-grow'>
                {activeMenuItem === "Settings" && <Settings />}
                {activeMenuItem === "Public Profile" && <Profile />}
                {activeMenuItem === "My Jobs" && <MyJobs/>}
            </div>
        </div>
    );   
};    

export default SidebarProfile;
