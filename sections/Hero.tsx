import Link from 'next/link'
import React from 'react'
import SplitText from '@/components/mainComp/ui/SplitText'

const Hero = () => {
  return (
    <section className='width relative h-screen pt-30 md:h-[80vh] bg-soft/80' > 
      <div className="absolute w-full lg:w-[50%] left-1/2 top-1/2 -translate-x-1/2 translate-y-20 flex items-center flex-col gap-4">
        <SplitText
          text="Thick, gooey, small-batch cookies for serious cravings!"
          className="text-3xl md:text-5xl font-bold text-center"
          delay={50}
          duration={0.1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p className='text-center px-10 md:px-0'>Baked in limited batches. Crafted with premium ingredients. Delivered across Lahore</p>
        <Link className='orderButtonStyle' href={"/"}>Order Now</Link>
      </div>
    </section>
  )
}

export default Hero
