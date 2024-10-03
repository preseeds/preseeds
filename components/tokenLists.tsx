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
  description: string;
}

const TokenLists = () => {
  let { data } = useReadContract({
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "getTokenInfos",
    args: [10],
  });

  if (data) {
    data = (data as Token[]).filter(
      (token: Token) => token.token != zeroAddress,
    );
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {(data as Token[])?.map((collection, index) => (
            <Link
              href={`/token/${collection.token}`}
              key={index}
              passHref
            >
              <TokenCard
                name={collection.name}
                symbol={collection.symbol}
                avatar={storage.resolveScheme(collection.image)}
                desciption={collection.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenLists;
