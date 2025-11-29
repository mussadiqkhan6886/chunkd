import Link from 'next/link'
import React from 'react'
import BlurText from '@/components/mainComp/ui/SplitText'

const Hero = () => {
  return (
    <section className='width relative h-screen pt-30 md:h-[80vh] bg-soft/80' > 
      <div className="absolute w-full lg:w-[50%] left-1/2 top-1/2 -translate-x-1/2 translate-y-10 md:translate-y-20 flex items-center flex-col gap-4">
        <BlurText
          text="Thick, gooey, freshly baked cookies for serious cravings!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl md:text-5xl text-center font-bold"
        />
        <p className='text-center px-10 md:px-0'>Freshly baked, irresistibly soft, and made with premium ingredients. delivered across Lahore.</p>
        <Link className='orderButtonStyle' href={"/menu"}>Order Now</Link>
      </div>
    </section>
  )
}

export default Hero
