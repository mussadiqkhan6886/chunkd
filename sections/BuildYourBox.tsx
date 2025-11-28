import { buildYourBoxOptions } from '@/lib/constants'
import React from 'react'

const BuildYourBox = () => {
  return (
    <section className='width'>
      <h2 className='sectionTitle'>Build Your Own Box</h2>
      <div className="px-10 mt-10">
        {buildYourBoxOptions.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center  ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-[300px] h-[400px] bg-soft/40 md:w-1/2">
              {/* <img
                src={item.image || "/placeholder.png"} 
                alt={item.name}
                className="w-full h-72 object-cover rounded-2xl shadow-lg"
              /> */}
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-3 p-10">
              <h2 className="text-3xl font-bold">{item.name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <button className="orderButtonStyle">Build Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default BuildYourBox
