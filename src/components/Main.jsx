import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
const Main = () => {
    const [movies,setMovies]=useState([])
    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const url = "https://api.consumet.org/anime/gogoanime/info/spy-x-family";
            const response = await axios.get(url);
            setMovies(response.data);
          } catch (err) {
            throw new Error(err.message);
          }
        };
      
        fetchMovies();
      }, []);
      
      console.log(movies);
  
  return (
   <>
 <div className='w-full h-[550px] mt-[62px] '>
  <div className=' w-full h-full '>
  <div className=' absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
    <img className='w-full h-full object-cover' src={movies?.image} alt='Background'/>
    <div className=' absolute w-full top-[20%] p-4 md:p-8 -z-0'>
                <h1 className=' text-3xl md:text-5xl text-white font-bold'>{movies?.title}</h1>
            <div className=' my-4'>
                <button className=' border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                <button className=' border text-white border-gray-300 py-2 px-5 ml-4'>Watch later</button>
                </div>
                <p className=' text-sm'>Released: </p>
            </div>
  </div>
</div>

   
   </>
  )
}

export default Main