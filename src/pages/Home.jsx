import React from 'react'
import Main from '../components/Main'
import Card from '../components/Card'
import request from '../Request'
const Home = () => {
  return (
    <>
     <Main/>
  <Card rowID='1' title='Trending' fetchURL={request.requestTrending}/>
  <Card rowID='2' title='Popular' fetchURL={request.requestPopular}/>
    </>
   
  )
}

export default Home