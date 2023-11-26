"use client";

import "atropos/css";

import Image from "next/image";
import Atropos from "atropos/react";

export default function Bagel() {
  return (
    <Atropos id="bagel" shadow={false} highlight={false} className="z-20">
      <div
        className="block h-full overflow-hidden rounded-2xl opacity-100 transition duration-500
        ease-in-out"
      >
        <Image
          src="/bagel.webp"
          alt="Bagel"
          draggable={false}
          width={478}
          height={418}
          className="aspect-square h-auto w-96"
        />
      </div>
    </Atropos>
  );
}
