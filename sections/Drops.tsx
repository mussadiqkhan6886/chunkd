import DropButton from '@/components/mainComp/DropButton'
import { limitedCookieDrops } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Drops = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Limited Flavours</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
        {limitedCookieDrops.map(cookie => (
          <div key={cookie.id} className='flex flex-col items-center gap-6'>
            <div className='w-full h-[450px] bg-soft/50'>
              {/* <Image  /> */}
            </div>
            <div className='flex items-center gap-7'>
            <DropButton startTime = {cookie.startTime} endTime={cookie.endTime} />
            </div>
            <div className='text-center px-3'>
              <h3 className='text-xl font-semibold'>{cookie.name}</h3>
              <p className='text-sm text-gray-800'>{cookie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Drops
