'use client';

import React, { useState } from 'react'
import Subscribe from './Subscribe'
import { FiX, FiXCircle } from 'react-icons/fi';
import { FaXRay } from 'react-icons/fa';

const SubscribeAb = () => {
    const [cross, setCross] = useState(false)
  return (
    <div className={`${cross ? "hidden" : "flex flex-col items-center"} comeUpBig fixed z-50 md:scale-75 left-0 right-0 w-full`}>
        <FiXCircle className='text-center text-[30px] md:text-[40px] cursor-pointer' onClick={() => setCross(true)} />
      <Subscribe />
    </div>
  )
}

export default SubscribeAb
