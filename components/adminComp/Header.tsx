'use client';

import axios from 'axios';
import { Home, MessageSquare, Package, PlusCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { FiPlusSquare } from 'react-icons/fi';
import { LuCookie } from 'react-icons/lu';

const Header = () => {

     const menuItems = [
    { name: 'Reviews', href: '/admin-dashboard/testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Cookies', href: '/admin-dashboard/products-list', icon: <LuCookie className="w-4 h-4" /> },
    { name: 'Add Cookies', href: '/admin-dashboard/add-product', icon: <PlusCircle className="w-4 h-4" /> },
    { name: 'Add Drops', href: '/admin-dashboard/add-drops', icon: <FiPlusSquare className="w-4 h-4" /> },
    { name: 'Drops', href: '/admin-dashboard/drops-list', icon: <Package className="w-4 h-4" /> },
    { name: 'Orders', href: '/admin-dashboard/orders-list', icon: <ShoppingBag className="w-4 h-4" /> },
  ]
  const pathname = usePathname()
  const router = useRouter()

  if(pathname === "/admin-dashboard/login"){
    return null
  }

  const logout = async () => {
    const res = await axios.get('/api/logout')
    router.push("/admin-dashboard/login")
  }

  return (
    <>
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
        <h1 className={`text-2xl md:text-3xl font-semibold text-main`}>Admin Panel</h1>
        <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-lg "
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <button className='underline cursor-pointer' onClick={logout}>Logout</button>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="border-b shadow-sm">
        <ul className="flex flex-wrap items-center justify-center gap-6 gap-y-3 px-6 py-3 text-gray-600">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1 transition `}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Header
