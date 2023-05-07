import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import loading from '../../assets/loading.gif'
const Watch = () => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <div className="mb-4 flex lg:justify-center">
        <iframe
          src={selectedServer}
          title="Selected Server"
          className="w-full h-[295px] mt-[65px] lg:h-[30rem] lg:w-[50rem]"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-wrap p-2 lg:justify-center">
        {episodes.map((item, index) => (
          <button
            key={index}
            onClick={() => handleServerSelection(item.url)}
            className={`bg-gray-200 rounded px-4 py-2 mr-2 mb-2 ${
              selectedServer === item.url ? 'bg-gray-400' : ''
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Watch;
