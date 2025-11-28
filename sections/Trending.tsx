import { bestSellerCookies } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

const Trending = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Best seller</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto'>
        {bestSellerCookies.map(cookie => (
          <div key={cookie.id} className='flex flex-col p-10 items-center gap-6 border border-soft/30'>
            <Link href={"/"} className='w-full block h-[450px] bg-soft/50'>
              {/* <Image  /> */}
            </Link>
            <div className='flex items-center gap-7'>
            </div>
            <div className='text-center px-3'>
              <h3 className='text-xl font-semibold'>{cookie.name}</h3>
              <h4 className='text-2xl font-[200]'>Rs.{cookie.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Trending
