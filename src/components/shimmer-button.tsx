import React from "react";

interface ShimmerButtonProps {
  children: React.ReactNode;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children }) => {
  return (
    <button className="relative flex h-12 w-40 items-center justify-center overflow-hidden rounded-full bg-gray-800">
      <div className="absolute left-0 top-0 h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
      <span className="relative z-10 font-semibold text-white">{children}</span>
    </button>
  );
};

export default ShimmerButton;
