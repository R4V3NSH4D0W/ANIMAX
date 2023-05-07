import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import InfoModel from './components/InfoModel'
import Watch from './components/Video/Watch'
import Search from './components/Search'
export const App = () => {
  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/info/:id' element={<InfoModel/>}/> 
    <Route path='/episode/:id' element={<Watch/>}/> 
    <Route path='/search' element={<Search/>}/> 
  </Routes>
  </>
  )
}
