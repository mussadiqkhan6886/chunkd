import { buildYourBoxOptions } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BuildYourBox = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Build Your Own Box</h2>
      <div className="lg:px-10 mt-10">
        {buildYourBoxOptions.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center  ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="h-[430px]  md:w-1/2">
              <Image
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                width={400}
                height={400}
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-3 p-10">
              <h2 className="text-3xl font-bold">{item.name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <Link href={"/build-box"} className="orderButtonStyle">Build Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default BuildYourBox
