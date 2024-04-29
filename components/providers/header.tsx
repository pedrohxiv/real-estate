"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between p-6 px-10 shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-10 items-center">
        <Image src="/logo.svg" height={150} width={150} alt="Logo" />
        <ul className="hidden md:flex gap-10">
          <Link href="/">
            <li
              className={cn(
                "hover:text-primary cursor-pointer font-medium text-sm",
                pathname === "/" && "text-primary"
              )}
            >
              For Sale
            </li>
          </Link>
          <Link href="/">
            <li
              className={cn(
                "hover:text-primary cursor-pointer font-medium text-sm",
                pathname === "/" && "text-primary"
              )}
            >
              For Rent
            </li>
          </Link>
          <Link href="/">
            <li
              className={cn(
                "hover:text-primary cursor-pointer font-medium text-sm",
                pathname === "/" && "text-primary"
              )}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2">
        <Button className="gap-2">
          <Plus className="h-5 w-5" />
          Post Your AD
        </Button>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
};
