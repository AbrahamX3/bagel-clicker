"use client";

import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "~/components/toggle-theme";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";

import { Separator } from "./ui/separator";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:relative md:top-auto">
      <div className="container flex h-[8vh] items-center justify-between">
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/bagel.webp"
              className="h-auto w-8"
              alt="Bagel"
              width={32}
              height={32}
            />
            <span className="flex items-center gap-2 align-middle font-bold">
              Bagel Clicker
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-x-2">
            <Link
              href="https://www.abraham.lat/"
              target="_blank"
              className="grayscale transition-all duration-150 ease-in hover:grayscale-0"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "w-9 px-0",
                )}
              >
                <span className="sr-only">Abraham&apos;s Personal Website</span>
                <Image
                  alt="Personal Website"
                  src="/personal-icon.webp"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Separator orientation="vertical" />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
