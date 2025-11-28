'use client';

import Masonry from '@/components/mainComp/ui/Masonry';
import { items } from '@/lib/constants';
import React from 'react'

const InstagramGrid = () => {


  return (
    <section className='width min-h-screen overflow-auto bg-black text-white px-10'>
      <h2 className='sectionTitle'>Media</h2>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </section>
  )
}

export default InstagramGrid



