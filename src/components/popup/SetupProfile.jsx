import React, {useState} from 'react'
import pr from '../../img/pr.jpg'
import { useNavigate } from 'react-router-dom';

const SetupProfile = ({isNewUser}) => {
    
    const [isOpen, setIsOpen] = useState(true);
    const useNav = useNavigate();

    const onClose  = () => {
        setIsOpen(false);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = () => {
        useNav('/profileEdit');
    };

    if (!isNewUser || !isOpen) return null;

    return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[850px]'>
            <div className='flex justify-end'><button className='text-red-600 text-xl place-self-end font-bold mr-3' onClick={onClose}>X</button></div>
            <div className='rounded bg-bar p-2 grid grid-cols-12'>
                <div className='col-span-6 p-5 pt-32 justify-center text-center ml-2'>
                    <h1 className='font-bold text-xl justify-end'>Setup Your Profile</h1>
                    <p className='pt-5 pb-5 text-light font-lg'>Enter the world of endless opportunities and discover jobs of all kind</p>
                    <button onClick={handleClick} className='py-3 px-9 border border-2 rounded-md border-moto text-blue font-bold cursor pointer'>Setup Your Profile</button>
                </div>
                <div className='col-span-6'>
                    <img src={pr} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SetupProfile