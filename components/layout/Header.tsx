"use client";

import React, { use } from 'react'
import { Navbar } from './Navbar';
import { UserButton } from '../auth/user-button';
import Link from 'next/link';
import { Icons } from '../icons';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/lib/hooks/use-current-user';
import { LoginButton } from '../auth/login-button';
import { RegisterButton } from '../auth/register-button';

const Header = () => {
  const user = useCurrentUser()

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Navbar />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div> */}
          {/* <nav className="flex items-center">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href="/twitter"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </nav> */}
          { user 
          ? <UserButton />
          : <>
              <LoginButton mode='modal'>
                Login
              </LoginButton>
              <RegisterButton mode='modal'>
                Sign Up
              </RegisterButton>
            </>
          }
          
        </div>
      </div>
    </header>
  )
}


export default Header