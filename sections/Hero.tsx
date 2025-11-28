import Link from 'next/link'
import React from 'react'
import SplitText from '@/components/mainComp/ui/SplitText'

const Hero = () => {
  return (
    <section className='width relative pt-30 h-[80vh] bg-soft/40' > 
      <div className="absolute md:z-40 left-1/2 top-1/2 -translate-x-1/2 translate-y-20 flex items-center flex-col gap-4">
        <SplitText
          text="Delicious Cookies!"
          className="text-5xl font-bold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p>Get Delicius cookies now with mouth watery ability</p>
        <Link className='orderButtonStyle z-40' href={"/"}>Order Now</Link>
      </div>
    </section>
  )
}

export default Hero
