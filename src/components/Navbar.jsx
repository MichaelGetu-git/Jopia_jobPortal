import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark} from "react-icons/fa6";
import AllJobs from '../pages/AllJobs';
import { useAuth } from '../contexts/AuthProvider';
import { doSignOut } from '../firebase/auth';


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { userLoggedIn, signOut} = useAuth();
    const handleMenuToggler = () => {
        setMenuOpen(!isMenuOpen)
    };

    const navbarItems = [
        {path: "/", title: "Home"},
        {path: "/allJobs", title: "All Jobs"},
        {path: "/postJobs", title: "Post Jobs"},
        {path: "/myJobs", title: "My Jobs"},
        {path: "/sidebarProfile", title: "Profile"},

    ]
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href="" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
            <ul className='hidden md:flex gap-12'>
                {
                    navbarItems.map(({path, title})=>(
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to = {path}
                                className = {({isActive}) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                {   userLoggedIn ? (
                    <button onClick={doSignOut} className='text-white py-2 px-5 bg-blue border rounded'>Sign Out</button>
                ) : (
                    <>
                        <Link to="/login" className='text-blue py-2 px-5 font-normal'>Log in</Link>
                        <Link to = "/sign-up" className='text-white py-2 px-5 bg-blue border rounded'>Sign Up</Link>
                    </>
                )

                }    
            </div>

            <div className='md:hidden block'>
                <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <FaXmark/> : <FaBarsStaggered className='w-6 h-6 text-primary'/>

                    }
                </button>
            </div>
        </nav>

        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "":"hidden"}`}>
        <ul>
                {
                    navbarItems.map(({path, title})=>(
                        <li key={path} className='text-base text-white py-1'>
                            <NavLink
                                to = {path}
                                className = {({isActive}) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
                <li className='text-white py-1'><Link to="/login" >Log in</Link></li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar