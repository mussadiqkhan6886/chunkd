'use client';

import React from 'react'
import { menuItems } from '@/lib/constants';
import StaggeredMenu from './ui/StaggeredMenu';


const HeaderAnimation = () => {
  return (

<div>
  <StaggeredMenu
  isFixed={true}
    position="left"
    items={menuItems}
    menuButtonColor={"black"}
    openMenuButtonColor={"black"}
    changeMenuColorOnOpen={true}
    colors={['#FF6F91', '#FFF7EE']}
    logoUrl="/logo.jpg"
    accentColor="#FF6F91"
    onMenuOpen={() => console.log('Menu opened')}
    onMenuClose={() => console.log('Menu closed')}
  />
</div>
  )
}

export default HeaderAnimation
