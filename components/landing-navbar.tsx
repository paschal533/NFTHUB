"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavMenu from "./nav-menu";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky z-50 top-0 bg-[#0d1427] border-[#2D2E36] left-0 flex flex-row justify-between w-full p-4 border-b align-center ">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
           NFTHUB
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <div className="">
          <NavMenu />
        </div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full text-black">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
