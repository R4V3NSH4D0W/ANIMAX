import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Search = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://api.consumet.org/anime/gogoanime/${search}?page=1`;

    try {
      const { data } = await axios.get(url, { params: { page: 2 } });
      setResult(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(result);

  return (
    <>
      <div className='mt-[6rem] flex justify-center'>
        <form onSubmit={handleSubmit} className="relative w-full m-2 lg:w-1/2 flex">
          <input
            className="py-2 pl-10 pr-3 rounded-l flex-1 bg-gray-100 focus:outline-none sm:w-full md:w-1/2"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
            style={{ color: 'black' }}
          />
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 rounded-r px-4">
            <FaSearch className="text-white" size={18} />
          </button>
        </form>
      </div>
     
      <div className=" p-2 mt-8">
      <div className="flex flex-wrap justify-center gap-4">
    {result.map((result)=>(
          <Link to={`/info/${result?.id}`}>
         <div className="relative">
         <img src={result.image} className="w-[11rem] h-auto lg:w-[16rem]" />
         <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-center">
           <span className=' text-sm lg:text-xl font-black'>{result.title}</span>
         </div>
       </div>
       </Link>

    ))} 
      </div>
    </div>
    
      
    
    </>
  );
};

export default Search;
