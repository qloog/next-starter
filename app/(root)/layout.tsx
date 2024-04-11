"use client";

import Header from '@/components/layout/Header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='flex-1'>
        {children}
      </main>
    </>
  )
}

export default Layout