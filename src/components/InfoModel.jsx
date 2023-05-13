import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cute from '../assets/cute.gif';

const InfoModel = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
      try {
        const { data } = await axios.get(url);
        setAnime(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
    setWatchList(storedWatchList);
  }, []);

  const HandelwatchList = (animeId) => {
    const isAlreadyAdded = watchList.includes(animeId);
    if (isAlreadyAdded) {
      //filter will remove id 
      const updatedWatchList = watchList.filter((id) => id !== animeId);
      setWatchList(updatedWatchList);
      // Update the watch list in localStorage
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    } else {
      const updatedWatchList = [...watchList, animeId];
      setWatchList(updatedWatchList);
      // Update the watch list in localStorage
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    }
  
    // console.log('Is already added to watch list:', isAlreadyAdded);
  };
  // console.log(watchList);

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
        <img src={cute} alt="loading" />
      </div>
    );
  }

  const renderWatchListButton = () => {
    if (watchList.includes(anime?.id)) {
      return <button className=' border text-white border-gray-300 py-2 px-5 ml-4'  onClick={() => HandelwatchList(anime?.id)}>
          Remove WatchList
         </button>;
    } else {
      return (
        <>
         <button
          className="border text-white border-gray-300 py-2 px-5 ml-4"
          onClick={() => HandelwatchList(anime?.id)}
        >
        Add to WatchList
        </button>
        </>
       
      );
    }
  };
 
    
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
                  {renderWatchListButton()}
                  
                </div>
                <p className='text-md font-bold text-white'>Genres: {anime && anime.genres && anime.genres.join(' ')} </p>
                <p className='text-sm font-bold text-white'>Released Date: {anime?.releaseDate} </p>
                {anime?.status === "Ongoing" ? (
                    <p className="text-md font-bold text-green-500">Status: {anime?.status}</p>
                  ) : (
                    <p className="text-md font-bold text-yellow-500">Status: {anime?.status}</p>
                  )}
                <p className='pt-4 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[65%] text-gray-200 max-h-[10rem] overflow-y-scroll  scrollbar-hide'>{anime?.description}</p>
              </div>
      </div>
      <h2 className=' font-extrabold md:text-xl p-4'>Episodes</h2>
      <div className="p-2 pl-6 flex flex-wrap gap-2 ">
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