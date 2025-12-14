'use client';

import React, { useEffect, useState } from 'react'
import Subscribe from './Subscribe'
import {  FiXCircle } from 'react-icons/fi';

const SubscribeAb = () => {
    const [cross, setCross] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
      const hasSeen = sessionStorage.getItem("seenNewsLetter")

      if(!hasSeen){
        setShow(true)
        sessionStorage.setItem("seenNewsLetter", "true")
      }

    }, [])

    if(!show) return null

  return (
    <div className={`${cross ? "hidden" : "flex flex-col items-center"} comeUpBig fixed z-50 md:scale-75 left-0 right-0 w-full`}>
        <FiXCircle className='text-center text-[30px] md:text-[40px] cursor-pointer' onClick={() => setCross(true)} />
      <Subscribe />
    </div>
  )
}

export default SubscribeAb
