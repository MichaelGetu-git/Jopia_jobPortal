import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet, Routes, Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import router from './Router/Router'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div>
      <Routes>
        {router.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  </Router>
  )
}

export default App
