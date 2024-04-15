import React from 'react'
import {Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

function Protected({children}) {
    const {userLoggedIn} = useAuth()
    if (!userLoggedIn) {
        return <Navigate to='/login' replace/>
    }

    return children
}

export default Protected