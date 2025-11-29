import { cookies } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

const Trending = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Best seller</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto'>
        {cookies.filter(item => item.hotSeller && item.category !== "limited").slice(0,4).map(cookie => (
          <div key={cookie.id} className='flex flex-col p-6 lg:p-10 items-center gap-6 border border-soft/30'>
            {cookie.soldOut ? <div className="relative w-full h-[450px] bg-soft/50 flex items-center justify-center">
            {/* Image placeholder */}
            {/* <Image src={cookie.image} alt={cookie.title} fill className="object-cover" /> */}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white font-bold text-2xl">Sold Out</p>
            </div>
          </div> : <Link href={`/menu/${cookie.slug}`} className='w-full block h-[450px] bg-soft/50'>
              {/* <Image  /> */}
            </Link>}
            <div className='flex items-center gap-7'>
            </div>
            <div className='text-center px-3'>
              <h3 className='text-xl font-semibold'>{cookie.title}</h3>
              <h4 className='text-2xl font-[200]'>Rs.{cookie.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Trending
