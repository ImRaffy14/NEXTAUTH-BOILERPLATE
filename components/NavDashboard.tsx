"use client"

import React from 'react'
import { signOut } from 'next-auth/react'

const NavDashboard = () => {
  return (
    <div className='flex items-center justify-between p-4'>
        <h1 className='text-2xl font-bold'>TODO LIST</h1>
        <button onClick={() => signOut()} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
            Sign Out
        </button>
    </div>
  )
}

export default NavDashboard