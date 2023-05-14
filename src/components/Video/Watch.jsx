import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation ,useNavigate} from 'react-router-dom';
import loading from '../../assets/loading.gif';
import {FaPlay} from 'react-icons/fa'
import AnimeList from '../AnimeList';
const Watch = () => {
  const { id } = useParams();
  const updatedUrl = id.replace(/-episode-\d+/, '');
  console.log(updatedUrl)
  const location = useLocation();
  const navigate=useNavigate();
  // const episodeList = location?.state?.anime;
  // console.log(episodeList?.episodes);
  const [episodelist,setEpisodeList]=useState([]);
  const [ep, setEpisodes] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  console.log(ep)
 useEffect(()=>{
  const fetchEpisodes=async()=>{
    const url=`https://api.consumet.org/anime/gogoanime/info/${updatedUrl}`;
    try{
        const {data}=await axios.get(url);
        setEpisodeList(data);
        setIsLoading(false);

    }catch(error){
        console.log(error)
        setIsLoading(false);
    }
}
fetchEpisodes();
 },[updatedUrl])
 console.log(episodelist)
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.consumet.org/anime/gogoanime/servers/${id}`;
      try {
        const { data } = await axios.get(url);
        setEpisodes(data);
        setSelectedServer(data[0].url);
        setIsLoading(false);
        setIsVideoReady(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const handleServerSelection = (serverUrl) => {
    setIsLoading(false);
    setSelectedServer(serverUrl);
  };

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
const changeEpisode=(episodeID)=>{
  setSelectedServer(null)
  navigate(`/episode/${episodeID}`)

}
if (isLoading || !isVideoReady) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
}
  return (
    <>
    <div className="flex flex-col mt-[4rem] md:flex-col lg:flex-row">
  <div className="w-full lg:w-1/5 order-2 lg:order-2 sm:order-2 md:order-2 pt-4">
  <span className=' font-black text-xl lg:text-2xl'>List of Episodes:</span>
  <div className='mt-4 w-full text-white max-h-[10rem] lg:max-h-[32rem] overflow-y-scroll scrollbar-hide'>
  {episodelist?.episodes?.map((list, index) => (
    <div key={list.id} className={`${index % 2 === 0 ? ' bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'} text-black font-bold text-md lg:text-sm flex justify-between flex-row h-10`}>
      <button onClick={() => changeEpisode(list.id)} className=' pl-4'>
      <span>Episode {list?.number}</span>
      </button>
      <div>
      {id==list.id?<FaPlay className=' mr-4 mt-3 text-blue-500'/>:"  "}
      </div>
    </div>
  ))}
  </div>
</div>
  <div className="w-full lg:w-3/5 order-1 lg:order-2  md:order-1">
  <iframe
      src={selectedServer}
      title="Selected Server"
      className="w-full h-[31vh]  lg:h-[40vh] xl:h-[70vh] sm:h-[45vh] md:h-[40vh]"
      allowFullScreen
      scrolling="no"
    ></iframe>
    
    <div className="flex flex-wrap p-2 lg:justify-center md:justify-center">
      {ep.map((item, index) => (
        <button
          key={index}
          onClick={() => handleServerSelection(item.url)}
          className={`bg-gray-200 rounded px-4 py-2 m-1 mb-2 w-[6.6rem] font-bold text-sm lg:text-md flex justify-center ${
            selectedServer === item.url ? 'bg-gray-400' : ''
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  </div>
  <div className="w-full lg:w-1/5 order-3 lg:order-3">
  <div className="flex flex-row lg:flex-col md:flex-row">
    <img src={episodelist?.image} className="p-2 h-[15rem] lg:h-[24rem] object-cover" />
    <div className="flex flex-col">
      <span className="p-2 font-bold text-xl">{episodelist?.title}</span>
      <div className="p-2 font-bold text-sm max-h-[12rem] overflow-y-scroll scrollbar-hide ">
        {episodelist?.description}
      </div>
    </div>
  </div>
</div>

  
</div>
   
{/* <AnimeList/> */}
    </>
  );
};

export default Watch;
