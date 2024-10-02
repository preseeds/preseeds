"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Header */}
      <div className="py-4 px-6 flex flex-col md:flex-row justify-between items-center bg-opacity-90 backdrop-blur-md shadow-lg">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4 mr-3 mb-4 md:mb-0">
          <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-transparent text-white">
            <Link
              href="/"
              className="hover:scale-110 transform transition-all duration-300"
            >
              PreSeeds
            </Link>
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex items-center mb-4 md:mb-0">
          <ConnectButton
            chainStatus="icon"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Nav;
