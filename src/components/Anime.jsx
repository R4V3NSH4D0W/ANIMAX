import React from 'react'
import { Link } from 'react-router-dom'
const Anime = ({item}) => {
  return (
    <div className='w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>

    <img className=' w-full h-[15rem] xl:h-[20rem]  block object-cover' src={`${item?.image}`} alt={item?.title}/>
    <p className='  absolute bottom-4 left-4 w-[9rem] lg:w-[15rem]  text-white font-bold overflow-x-hidden'>{item?.title}</p>
    <div className=' absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
    <Link to={`/info/${item?.id}`}>
        <p className=' whitespace-normal text-xl md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
        </Link>
        {/* <p onClick={saveShow}> */}
        {/* <p >
            {like?<FaHeart className=' absolute top-4 left-4 text-gray-300'/>:<FaRegHeart className=' absolute top-4 left-4 text-gray-300'/>}
        </p> */}
        </div>
        </div>
  )
}

export default Anime