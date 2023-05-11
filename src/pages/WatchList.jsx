import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
    setWatchList(storedWatchList);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //since watchlist is in array now i need to loop all data
        const fetchResults = await Promise.all(
          watchList.map(async (animeId) => {
            const response = await axios.get(`https://api.consumet.org/anime/gogoanime/info/${animeId}`);
            return response.data;
          })
        );

        setResults(fetchResults);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [watchList]);

//   console.log(watchList);
//   console.log(results);

  return (
    <>
    <div className="p-2 mt-[5rem]">
        <div className="flex flex-wrap justify-center gap-4">
          {results?.map((result) => (
            <Link
              to={`/info/${result?.id}`}
              key={result?.id}
            >
              <div className="relative">
                <img
                  src={result.image}
                  className="w-[11rem] h-[16rem] object-cover lg:h-[20rem] lg:w-[16rem]"
                />
                <p className="absolute bottom-4 left-4 w-[8rem] lg:w-[15rem] h-6  text-white font-bold overflow-hidden">
                  {result?.title}
                </p>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-center">
                  <span className="text-sm lg:text-xl font-black">{result.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default WatchList