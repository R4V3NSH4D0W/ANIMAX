import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import loading from '../assets/loading.gif'
import { useCookies } from 'react-cookie';
const InfoModel = () => {
    const {id}=useParams();
    const [anime,setAnime]=useState({})
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchData=async()=>{
            const url=`https://api.consumet.org/anime/gogoanime/info/${id}`;
            try{
                const {data}=await axios.get(url);
                setAnime(data);
                setIsLoading(false);

            }catch(error){
                console.log(error)
                setIsLoading(false);
            }
        }
        fetchData();
    },[id])
    console.log(anime)
    const truncateString=(str,num)=>{
        if(str?.length>num){
            return str.slice(0,num)+'...';
        }else{
            return str;
        }
    }
    if (isLoading) {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <img src={loading} alt="loading"/>
           </div>
        );
      }
  return (

<>

      <div className='w-full h-[550px] mt-[62px]'>
       
          <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
         
              <img
                className='w-full h-full object-cover'
                src={anime?.image}
                alt={anime?.id}
              />
              <div className='absolute w-full top-[20%] p-4 md:p-8 -z-0'>
                <h1 className='text-3xl md:text-5xl text-white font-bold'>
                  {anime?.title}
                </h1>
                <div className='my-4'>
                  <Link to={`/episode/${anime?.id}-episode-1`}>
                  <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'
                  >
                    Watch Now
                  </button>
                  </Link>
                </div>
                <p className='text-sm text-white'>Genres: {anime && anime.genres && anime.genres.join(' ')} </p>

                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[65%] text-gray-200'>{truncateString(anime?.description,400)}</p>
              </div>
      </div>
      <h2 className=' font-extrabold md:text-xl p-4'>Episodes</h2>
      <div className="p-2 pl-6 flex flex-wrap gap-2 lg:flex-nowrap">
  {anime?.episodes?.map((episode) => (
        // <Link to={`/episode/${episode.id}`} key={episode?.id}state={{ anime: anime }} ></Link>
    <Link to={`/episode/${episode.id}`} key={episode?.id}>
      <button key={episode.id} className="bg-black rounded w-10 h-8 text-white">
        {episode.number}
      </button>
    </Link>
  ))}
</div>

    
    </>

  )
}

export default InfoModel