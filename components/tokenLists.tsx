"use client";
import FactoryAbi from "@abis/Factory.json";
import { FACTORY_ADDRESS, storage, network } from "@config/index";
import Link from "next/link";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import TokenCard from "./tokenCard";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { useState } from "react";

interface Token {
  token: Address;
  isPoolCreated: boolean;
  name: string;
  symbol: string;
  image: string;
  raisedAmount: bigint;
  targetLiquidity: bigint;
  unlockDate: bigint;
}

const TokenLists = () => {
  const [startAddress, setStartAddress] = useState<Address>(
    "0x0000000000000000000000000000000000000001"
  );

  const { data: tokenCount, isLoading: isTokenCountLoading } = useReadContract({
    config: getDefaultConfig({
      appName: "Preseeds Trade",
      projectId: "YOUR_PROJECT_ID",
      chains: [network],
      ssr: true, // If your dApp uses server side rendering (SSR)
    }),
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "tokenCount",
    args: [],
  });

  const { data, isLoading } = useReadContract({
    config: getDefaultConfig({
      appName: "Preseeds Trade",
      projectId: "YOUR_PROJECT_ID",
      chains: [network],
      ssr: true,
    }),
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "getTokenInfos",
    args: [startAddress, 9],
  });

  const [pageCount, setPageCount] = useState<number>(1);

  const filteredData = (data as Token[])?.filter(
    (token: Token) => token.token != zeroAddress
  );

  if (isLoading || isTokenCountLoading) {
    return <div>Loading</div>
  }

  const handleNext = () => {
    setPageCount(pageCount + 1);
    setStartAddress(filteredData[filteredData.length - 1].token);
  };

  const handleBackToFirst = () => {
    setPageCount(1);
    setStartAddress("0x0000000000000000000000000000000000000001")
  }

  return (
    <div className="container mx-auto mb-10">
      {filteredData && filteredData.length > 0 ? (
        <>
          <div>Total token: {(tokenCount as bigint).toString()}</div>
          <div className="mb-2">Page: {`${pageCount}`}</div>
          <div className="flex justify-between mb-8">
            <button
              className="bg-gray-700 text-white px-4 py-2"
              onClick={handleBackToFirst}
            >
              Back to first
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2"
              onClick={handleNext}
              disabled={filteredData.length < 9}
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((token, index) => (
              <Link href={`/token/${token.token}`} key={index} passHref>
                <TokenCard
                  name={token.name}
                  isPoolCreated={token.isPoolCreated}
                  symbol={token.symbol}
                  avatar={storage.resolveScheme(token.image)}
                  raisedAmount={token.raisedAmount}
                  targetLiquidity={token.targetLiquidity}
                />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-white mt-10">
          No tokens are currently raising funds, Create your one now!
        </div>
      )}
    </div>
  );
};

export default TokenLists;
