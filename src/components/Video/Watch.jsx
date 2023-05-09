import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation ,useNavigate} from 'react-router-dom';
import loading from '../../assets/loading.gif';
import { Link } from 'react-router-dom';
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
  <span className=' font-black text-xl lg:text-2xl'>List of Episodes:</span>
  <div className='mt-4 w-full text-white'>
  {episodelist?.episodes?.map((list, index) => (
    <div key={list.id} className={`${index % 2 === 0 ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-700 hover:bg-gray-800'} text-white text-md lg:text-sm flex justify-center h-10`}>
      <button onClick={() => changeEpisode(list.id)}>
      {list.id.replace(/-/g, ' ')}
      </button>
    </div>
  ))}
  </div>
</div>
  <div className="w-full md:w-3/5 order-1 lg:order-2">
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
  <div className="w-full md:w-1/5 order-3 lg:order-3">
  <div className="flex flex-row lg:flex-col">
    <img src={episodelist?.image} className="p-2 h-[15rem] lg:h-[23rem]" />
    <div className="flex flex-col">
      <span className="p-2 font-bold text-xl">{episodelist?.title}</span>
      <div className="p-2 font-bold text-sm max-h-[12rem] overflow-y-scroll scrollbar-hide ">
        {episodelist?.description}
      </div>
    </div>
  </div>
</div>

  
</div>
   

    </>
  );
};

export default Watch;
