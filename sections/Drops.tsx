import DropButton from '@/components/mainComp/DropButton'
import LimitedCard from '@/components/mainComp/LimitedCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Drops = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Limited Flavours</h2>
      <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 gap-10">
        <LimitedCard />
      </div>
    </section>
  )
}

export default Drops
