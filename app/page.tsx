"use client";

import TokenList from "@components/tokenLists";
import Link from "next/link";
import HowItWorks from "@components/howItWorks";

export default function Home() {
  return (
    <div className="text-center">
      <div className="font-bold text-xl hover:text-blue-600 mb-4">
        <Link href="/create">[Create Token]</Link>
      </div>
      <div className="mb-4">
        <HowItWorks />
      </div>
      <TokenList />
    </div>
  );
}
