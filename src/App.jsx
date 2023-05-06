import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
export const App = () => {
  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
  </Routes>
  </>
  )
}
