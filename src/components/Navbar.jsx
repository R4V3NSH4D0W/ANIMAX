import React from 'react'
import {FaBars,FaTimes} from "react-icons/fa"
import { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import request from '../Request'
const Navbar = () => {
  let Links=[
    {name:"search"},
    {name:"Home"},
    {name:"TopAnime",request:request?.requestTrending},
    {name:"NewSeasons",request:request?.requestnewSeason},
    {name:"Movies",request:request?.requestMovie},
  

  ];
  let [open,setOpen]=useState(false);
  const handleLinkClick = () => {
    setOpen(false);
  };
  return (
  <>
   <div className='shadow-md w-full fixed top-0 left-0 z-50'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <Link to={`/Home`}>
      <div className='font-bold text-2xl cursor-pointer flex items-center 
      text-gray-800'>
       ANIMAX
      </div>
      </Link>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <FaBars name={open ? 'close':'menu'}></FaBars>
      </div>

      <ul className={`md:flex md:items-center md:pb-0  absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${open ? 'top-10 ':'top-[-490px]'}`}>
        {
         
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-6'>
              <Link to={`/${link.name}` } onClick={handleLinkClick} state={{request:link.request}}>
              <h1 className='text-gray-800 hover:text-cyan-400 duration-300'>{link.name}</h1>
              </Link>
            </li>
          ))
        }
      </ul>
      </div>
    </div>
  </>
  )
}

export default Navbar