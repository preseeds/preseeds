"use client";
import FactoryAbi from "@abis/Factory.json";
import { FACTORY_ADDRESS } from "@config/index";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";

interface Token {
  token: Address,
  isPoolCreated: boolean,
  name: string,
  symbol: string,
  image: string,
  description: string,
}

const TokenLists = () => {
  let { data } = useReadContract({
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "getTokenInfos",
    args: [10],
  });

  console.log("Data", data);

  if (data) {
    data = (data as Token[]).filter((token: Token) => token.token != zeroAddress );
  }

  return (
    <div>
      <h1>Token Lists</h1>
      {(data as Token[])?.map((token: Token) => (
        <div key={token.token}>
          <div>{token.token}</div>
          <div>{token.name}</div>
          <div>{token.symbol}</div>
          <div>{token.image}</div>
          <div>{token.description}</div>
        </div>
      ))}
    </div>
  );
};

export default TokenLists;
