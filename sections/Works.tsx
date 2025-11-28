import { steps } from '@/lib/constants'
import React from 'react'

const Works = () => {
  return (
    <section className="width py-26">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex space-x-4 py-6 rounded-2xl items-center justify-center "
          >
            <step.icon size={46} color='#D81B60' />
            <div className='w-[200px]'>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Works
