import BuildYourBox from '@/sections/BuildYourBox'
import Drops from '@/sections/Drops'
import Hero from '@/sections/Hero'
import InstagramGrid from '@/sections/InstagramGrid'
import NewsLetter from '@/sections/NewsLetter'
import Reviews from '@/sections/Reviews'
import Timing from '@/sections/Timing'
import Trending from '@/sections/Trending'
import Works from '@/sections/Works'
import React from 'react'

const Home = () => {
  return (
    <main className='bg-secondary'>
      <Hero />
      <Drops />
      <Trending />
      <BuildYourBox />
      <Works />
      <InstagramGrid />
      <Reviews />
      <Timing />
      <NewsLetter />
    </main>
  )
}

export default Home
