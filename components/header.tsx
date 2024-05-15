"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn, user } = useUser();

  const pathname = usePathname();

  return (
    <header className="flex justify-between p-6 px-10 shadow-sm fixed top-0 w-full z-20 bg-white">
      <div className="flex gap-10 items-center">
        <Image
          src="/logo.svg"
          height={150}
          width={150}
          alt="Logo"
          priority
          className="h-auto w-auto"
        />
        <ul className="hidden md:flex gap-10">
          <Link href="/">
            <li
              className={cn(
                "hover:text-primary cursor-pointer font-medium text-sm",
                pathname === "/" && "text-primary"
              )}
            >
              For Sell
            </li>
          </Link>
          <Link href="/rent">
            <li
              className={cn(
                "hover:text-primary cursor-pointer font-medium text-sm",
                pathname === "/rent" && "text-primary"
              )}
            >
              For Rent
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href="/add-new-listing">
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            Post Your AD
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user.imageUrl}
                height={35}
                width={35}
                alt="User image"
                className="rounded-full ml-4 cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/user">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/user/my-listing">My Listing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
