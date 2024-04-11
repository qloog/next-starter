"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Icons } from "@/components/icons"
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          AIGC
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/ai-generator"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/ai-generator" ? "text-foreground" : "text-foreground/60"
          )}
        >
          AI Generator
        </Link>
        <Link
          href="/ai-editor"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/ai-editor" ? "text-foreground" : "text-foreground/60"
          )}
        >
          AI Editor
        </Link>
        <Link
          href="/pricing"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/pricing")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Pricing
        </Link>
      </nav>
    </div>
  );
};