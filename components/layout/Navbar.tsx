"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[1000px] shadow-sm">
      <div className="flex gap-x-2">
        <Button 
          asChild
          variant={pathname === "/" ? "default" : "outline"}
        >
          <Link href="/">
            首页
          </Link>
        </Button>
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
          variant={pathname === "/test/server" ? "default" : "outline"}
        >
          <Link href="/test/server">
            Server
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};