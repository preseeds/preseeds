"use client";
import FactoryAbi from "@abis/Factory.json";
import { FACTORY_ADDRESS } from "@config/index";
import { zeroAddress } from "viem";
import { useReadContract } from "wagmi";

const TokenLists = () => {
  let { data, error } = useReadContract({
    abi: FactoryAbi,
    address: FACTORY_ADDRESS,
    functionName: "getTokenInfos",
    args: [10],
  });

  console.log("Error", error);
  console.log("Data", data);

  if (data) {
    data = (data as any[]).filter((token: any) => token.token != zeroAddress );
  }

  return (
    <div>
      <h1>Token Lists</h1>
      {data?.map((token: any) => (
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
