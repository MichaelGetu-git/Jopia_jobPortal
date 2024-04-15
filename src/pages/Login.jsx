import React, { useContext, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/AuthProvider'
import Footer from '../components/Footer'


const Login = () => {
    
const { userLoggedIn } = useAuth()

const navigate = useNavigate();
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isSigningIn, setIsSigningIn] = useState(false)
const [errorMessage, setErrorMessage] = useState('')

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

const onSubmit = async(event)=> {
   event.preventDefault()
   if(!isSigningIn) {
    setIsSigningIn(true)
    try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/')
    } catch(error) {
        setErrorMessage("Error: Can't Login");
        setIsSigningIn(false);
    }
   } else {
    alert("ERROR: Login Not working");
   }
}

const onGoogleSignIn = async(event) => {
    event.preventDefault()
    if(!isSigningIn) {
      try {
        await doSignInWithGoogle();
        navigate('/');
      } catch(error) {
        setErrorMessage("Error: cant Sign in With Google");
        setIsSigningIn(false);
      }
    }
}
  return (
    <div>
       <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
            <nav className='flex justify-between items-center py-16'>
                <a href="" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
            </nav>
        </header>
        {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
        <div className='w-full flex justify-center mt-18 mb-36'>
        <form  onSubmit={onSubmit} className='w-[35%] h-[60%] bg-[] flex-col p-12 rounded shadow-custom'>
            
            <div className='w-full flex flex-col  p-2 justify-between '>
                <h3 className='text-2xl font-semibold mb-4'>Login</h3>
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
                    <button type='submit' disabled={isSigningIn} className={`w-full py-3 bg-blue text-white font-bold ${isSigningIn}`}>{isSigningIn ? 'Signing In...' : 'Sign In'}</button>
                </div >
                <div className='mt-5 flex items-center justify-center  py-2 w-full border border-[#4285F4] rounded'>
                <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"/>
                <button  
                        className='bg-white text-[#4285F4] font-bold'
                        disabled={isSigningIn}
                        onClick={(e) =>{onGoogleSignIn(e)}}>
                            Sign Up with Google</button>
                </div>  
              </div>
            <div className='w-full flex items-center justify-center'>
                <p className='text-sm font-normal'>Already have an account? <Link to = '/sign-up' className='font-semibold underline text-blue'>SignUp</Link></p>
            </div>
        </form>
    </div>
    <Footer/>
    </div>
    
  )
}

export default Login