'use client';

import React, { useEffect, useState } from 'react'
import HeaderAnimation from './HeaderAnimation';

const Header = () => {

  // const [scrolled, setScrolled] = useState(false)

  // useEffect(() => {

  //   const scrollFeature = () => {
  //     if(window.innerHeight > 20){
  //       setScrolled(true)
  //     }else{
  //       setScrolled(false)
  //     }
  //   }

  //   document.addEventListener("scroll", scrollFeature)

  //   return document.removeEventListener("scroll", scrollFeature)

  // }, [window.innerHeight])

  return (
    // <header className={`width px-10 py-3 w-full ${scrolled ? "bg-soft" : "bg-transparent"} text-primary  `}>
      <HeaderAnimation />
    // </header>
  )
}

export default Header
