import React, {useState} from 'react'
import pr from '../../img/pr.jpg'

const SetupProfile = ({isNewUser}) => {
    
    const [isOpen, setIsOpen] = useState(true);

    const onClose  = () => {
        setIsOpen(false);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


    if (!isNewUser || !isOpen) return null;

    return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[850px]'>
            <div className='flex justify-end'><button className='text-red-600 text-xl place-self-end font-bold mr-3' onClick={onClose}>X</button></div>
            <div className='bg-white rounded p-2 grid grid-cols-5'>
                <div className='col-span-2'>
                    
                </div>
                <div className='col-span-3'>
                    <p className='font-bold text-xl justify-end'>Setup Your Profile</p>
                    <img src={pr} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SetupProfile