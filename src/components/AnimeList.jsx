import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
const AnimeList = () => {
    const [suggested, setSuggested]= useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response= await axios.get()
            }catch(error){
                console.log(error)
            }
        }
    })
  return (
    <div>Recommended</div>
  )
}

export default AnimeList