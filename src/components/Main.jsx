import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = "https://api.consumet.org/anime/gogoanime/top-airing";
        const { data } = await axios.get(url, { params: { page: 1 } });
        setMovies(data.results);
      } catch (err) {
        throw new Error(err.message);
      }
    };

    fetchMovies();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? movies.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchThreshold = 50;

    if (touchStartX.current - touchEndX > touchThreshold) {
      handleNextSlide();
    } else if (touchEndX - touchStartX.current > touchThreshold) {
      handlePrevSlide();
    }
  };

  return (
    <>
      <div className='w-full h-[450px] mt-[62px]'>
        <div
          className='w-full h-full relative'
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className='absolute w-full h-[450px] bg-gradient-to-r from-black'></div>
          {movies.length > 0 && (
            <>
              <img
                className='w-full h-full object-cover'
                src={movies[currentSlide]?.image}
                alt={movies[currentSlide]?.id}
              />
              <div className='absolute w-full top-[20%] p-4 md:p-8 -z-0'>
                <h1 className='text-3xl md:text-5xl text-white font-bold'>
                  {movies[currentSlide]?.title}
                </h1>
                <div className='my-4'>
                  <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                    Watch Now
                  </button>
                  <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                   Detail
                  </button>
                </div>
                <p className='text-sm text-white'>Genres: {movies[currentSlide]?.genres.join(', ')} </p>
              </div>
            </>
          )}
          <div className='absolute left-2 top-[50%] transform -translate-y-1/2 cursor-pointer'>
            <FaChevronLeft size={32} color='white' onClick={handlePrevSlide} className='hidden lg:inline-block xl:inline-block hover:opacity-50' />
          </div>
          <div className='absolute right-2 top-[50%] transform -translate-y-1/2 cursor-pointer'>
            <FaChevronRight size={32} color='white' onClick={handleNextSlide} className=' hidden lg:inline-block xl:inline-block hover:opacity-50' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;