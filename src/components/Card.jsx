import React from 'react'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Anime from './Anime'
const Card = ({title,fetchURL,rowID}) => {
    const [anime, setAnime] =useState([])
    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{setAnime(response.data.results)})
    },[fetchURL])

const slideLeft=()=>{
    var slider=document.getElementById('slider' +rowID)
    slider.scrollLeft=slider.scrollLeft-500;
}
const slideRight=()=>{
    var slider=document.getElementById('slider' + rowID)
    slider.scrollLeft=slider.scrollLeft+500;
}
  return (
    <>
     <h2 className=' font-bold md:text-xl p-4'>{title}</h2>
     <div className='relative flex items-center group'>
     <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
     <div
          id={'slider' +rowID}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {anime.map((item, id) => (
         <Anime item={item} key={id}/>
          ))}
        </div>
        <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
      </div>
    </>
  )
}

export default Card