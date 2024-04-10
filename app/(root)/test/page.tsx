"use client";

import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button'

const Page = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center gap-x-2">
      <Button 
        asChild
        variant={pathname === "/test/client" ? "default" : "outline"}
      >
        <Link href="/test/client">
          Client
        </Link>
      </Button>
      <Button 
        asChild
        variant={pathname === "/test/erver" ? "default" : "outline"}
      >
        <Link href="/test/server">
          Server
        </Link>
      </Button>
    </div>
  )
}

export default Page;