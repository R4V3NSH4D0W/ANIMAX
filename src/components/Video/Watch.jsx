import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation ,useNavigate} from 'react-router-dom';
import loading from '../../assets/loading.gif';
import { Link } from 'react-router-dom';
const Watch = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate=useNavigate();
  const episodeList = location?.state?.anime;
  console.log(episodeList?.episodes);
  const [ep, setEpisodes] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(ep)
 
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.consumet.org/anime/gogoanime/servers/${id}`;
      try {
        const { data } = await axios.get(url);
        setEpisodes(data);
        setSelectedServer(data[0].url);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const handleServerSelection = (serverUrl) => {
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
  return (
    <>
    <div className="flex flex-col mt-[4rem] md:flex-row">
  <div className="w-full md:w-1/5 order-2 lg:order-2   pt-4">
  <span className='font-bold text-xl'>List of Episodes:</span>
  <div>
  {episodeList?.episodes?.map((list) => (
      <button key={list.id}  onClick={()=>{
        changeEpisode(list.id)
      }}>
        {list.number}
      </button>
  ))}
  </div>
</div>
  <div className="w-full md:w-3/5 order-1 lg:order-2 bg-gray-300">
  <iframe
      src={selectedServer}
      title="Selected Server"
      className="w-full h-[30vh] lg:h-[72vh]"
      allowFullScreen
      scrolling="no"
    ></iframe>
    
    <div className="flex flex-wrap p-2 bg-slate-600 lg:justify-center">
      {ep.map((item, index) => (
        <button
          key={index}
          onClick={() => handleServerSelection(item.url)}
          className={`bg-gray-200 rounded px-4 py-2 mr-2 mb-2 w-[115px] font-bold text-sm lg:text-md flex justify-center ${
            selectedServer === item.url ? 'bg-gray-400' : ''
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  </div>
  <div className="w-full md:w-1/5 order-3 lg:order-3 bg-gray-400">
    Container C
  </div>
</div>
   

    </>
  );
};

export default Watch;
