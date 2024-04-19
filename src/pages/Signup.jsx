import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/AuthProvider'
import Footer from '../components/Footer'

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const onSubmit = async(event)=> {
        event.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/', {state: {isNewUser: true}}); 
                
            } catch(error) {
                setErrorMessage("Error: Can't Signup");
                setIsRegistering(false);
            }
        } else {
            alert("Error: Signup Not Working");
        }
    }


  return (
    <div>
        <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
            <nav className='flex justify-between items-center py-16'>
                <a href="" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
            </nav>
        </header>
        <div className='w-full flex justify-center mt-18 mb-36'>
        <form  onSubmit={onSubmit} className='w-[34%] h-[60%] bg-[] flex-col p-12 rounded shadow-custom'>
            
            <div className='w-full flex flex-col  p-2 justify-between '>
                <h3 className='text-2xl font-semibold mb-4'>SignUp</h3>
                <div className='w-full flex flex-col'>
                    <label className='relative left-0 text-blue font-semibold'>Email Adress</label>
                    <input type="email"
                        autoComplete='off'
                        name='email'
                        placeholder="Email Adress"
                        onChange={handleEmailChange}
                        className= 'peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900
                        focus:outline-none focus:border-blue'/>
                </div>
                <div className='w-full flex flex-col mt-3'>
                    <label for="password" className='relative left-0 text-blue font-semibold'>Password</label>
                    <input type="password"
                        name='password'
                        autoComplete='off'
                        placeholder="Email Adress"
                        onChange={handlePasswordChange}
                        className= 'peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900
                        focus:outline-none focus:border-blue'/>
                </div>
                {errorMessage && (<span className='text-red-600 font-bold'>{errorMessage}</span>)}
                <div className='relative mt-5'>
                    <button type='submit' className='px-6 py-2 bg-blue text-white font-bold'>Sign Up</button>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <p className='text-sm font-normal'>Already have an account? <Link to = '/login' className='font-semibold underline text-blue'>Login</Link></p>
            </div>
        </form>
    </div>
    <Footer/>
    </div>
  )
}

export default Signup