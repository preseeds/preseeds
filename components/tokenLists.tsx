"use client";

import FactoryAbi from "@abis/Factory.json";
import { FACTORY_ADDRESS, storage } from "@config/index";
import Link from "next/link";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import TokenCard from "./tokenCard";

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
  // Fetch data from the contract
  const { data } = useReadContract({
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "getTokenInfos",
    args: [10], // Replace with the appropriate number if needed
  });

  // Filter out tokens with invalid addresses
  const filteredData = (data as Token[])?.filter(
    (token: Token) => token.token != zeroAddress,
  );

  console.log("Data", filteredData);

  return (
    <div className="container mx-auto my-10">
      {filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((token, index) => (
            <Link href={`/token/${token.token}`} key={index} passHref>
              <TokenCard
                name={token.name}
                symbol={token.symbol}
                avatar={storage.resolveScheme(token.image)}
                raisedAmount={token.raisedAmount}
                targetLiquidity={token.targetLiquidity}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-white mt-10">
          No tokens are currently raising funds, Create your one now!
        </div>
      )}
    </div>
  );
};

export default TokenLists;
