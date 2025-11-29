import DropButton from '@/components/mainComp/DropButton'
import LimitedCard from '@/components/mainComp/LimitedCard'
import { cookies } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Drops = () => {

   const res = cookies.filter(item => item.category === "limited").slice(0,4)

  return (
    <section className='width'>
      <h2 className='sectionTitle'>Limited Flavours</h2>
      <div className='flex flex-col items-center'>
        <LimitedCard data={res} button={true} />
      </div>
    </section>
  )
}

export default Drops
