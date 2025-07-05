import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='h-screen'>
        <main className='grow'>
            <Outlet/>
        </main>
    </div>
  )
}

