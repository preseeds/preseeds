"use client";
import Image from "next/image";
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
        <Link href="/">
          <div className="flex items-center space-x-4 mr-3 mb-4 md:mb-0 cursor-pointer">
            <Image width={40} height={40} src="/sticker.gif" alt="Sticker" />
            <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-transparent text-white bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
              PreSeeds
            </div>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-3">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-white py-4">
        <p>
          Follow us on Twitter:{" "}
          <Link href="https://x.com/preseeds_intern" target="_blank" rel="noopener noreferrer">
            <span className="text-blue-400 hover:text-blue-600 underline">@preseeds_intern</span>
          </Link>{" "}
          - Join us on Telegram:{" "}
          <Link href="https://t.me/launchonpreseeds" target="_blank" rel="noopener noreferrer">
            <span className="text-blue-400 hover:text-blue-600 underline">@launchonpreseeds</span>
          </Link>
          .
        </p>
      </footer>
    </div>
  );
};

export default Nav;
