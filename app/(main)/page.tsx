import SubscribeAb from '@/components/mainComp/SubscribeAb'
import WhatsButton from '@/components/mainComp/WhatsButton'
import BuildYourBox from '@/sections/BuildYourBox'
import Bundles from '@/sections/Bundles'
import Drops from '@/sections/Drops'
import Hero from '@/sections/Hero'
import InstagramGrid from '@/sections/InstagramGrid'
import NewsLetter from '@/sections/NewsLetter'
import Reviews from '@/sections/Reviews'
import Timing from '@/sections/Timing'
import Trending from '@/sections/Trending'
import Works from '@/sections/Works'
import React from 'react'

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main className='bg-secondary'>
      <SubscribeAb />
      <WhatsButton />
      <Hero />
      <Drops />
      <Trending />
      <BuildYourBox />
      <Bundles />
      <Works />
      <InstagramGrid />
      <Reviews />
      <Timing />
      <NewsLetter />
    </main>
  )
}

export default Home
