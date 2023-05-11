import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loading from '../../assets/loading.gif';

const Lists = () => {
  const location = useLocation();
  const requestAPI = location.state?.request;
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = sessionStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [maxPages, setMaxPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(requestAPI, { params: { page: currentPage } });
        setRequest(data.results);
        setIsLoading(false);
        setMaxPages(Math.ceil(data.results.length / 10));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestAPI, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
    navigate(`?page=${page}`, { state: { request: requestAPI } });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
        <img src={loading} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className="p-2 mt-[5rem]">
        <div className="flex flex-wrap justify-center gap-4">
          {request?.map((result) => (
            <Link
              to={`/info/${result?.id}`}
              key={result?.id}
              onClick={() => sessionStorage.setItem('currentPage', currentPage.toString())}
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
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-l hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Lists;

