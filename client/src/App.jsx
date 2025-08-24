import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar/Navbar'
import Register from './component/Register/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './component/Login/Login'
import View from './component/dashboard/view'
import Add from './component/dashboard/Add'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
    <Routes>
       
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/view" element={<View />}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
    </>
  )
}

export default App
