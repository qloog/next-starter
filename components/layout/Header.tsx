"use client";

import React, { use } from 'react'
import { useSession } from 'next-auth/react';
import { Navbar } from './Navbar';

const Header = () => {
  return (
    <header style={{ display: "flex", "justifyContent": "space-around" }}>
      <Navbar />
    </header>
  )
}


export default Header