import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import router from './Router/Router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
            <RouterProvider router={router}/>
    </AuthProvider>
)
