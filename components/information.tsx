"use client";
import TokenAbi from "@abis/Token.json";
import { storage } from "@config/index";
import Image from "next/image";
import { Address, formatEther } from "viem";
import { useReadContract } from "wagmi";

interface Props {
  tokenAddress: Address;
}

type TokenInfo = [
  string,
  string,
  string,
  string,
  bigint,
  bigint,
  bigint,
  bigint,
  string,
  boolean,
];

const TokenInformation: React.FC<Props> = ({ tokenAddress }) => {
  const { data } = useReadContract({
    address: tokenAddress,
    abi: TokenAbi,
    functionName: "getTokenInfo",
  });

  const tokenData: TokenInfo = data as TokenInfo;
  console.log("Token Data", tokenData);

  if (!tokenData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto container">
      <div className="text-white p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center space-x-4">
          <div className="w-80 h-80">
            <Image
              src={storage.resolveScheme(tokenData[2])}
              width={500}
              height={500}
              layout="responsive"
              quality={100}
              alt={`${tokenData[0]} image`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{tokenData[0]}</h3>
            <p className="text-sm text-gray-400">{tokenData[1]}</p>
            <div className="text-sm text-gray-400 flex">{tokenData[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {tokenData ? (
        <div>
          <div>Name: {tokenData[0]}</div>
          <div>Symbol: {tokenData[1]}</div>
          <div>Image: {tokenData[2]}</div>
          <div>Description: {tokenData[3]}</div>
          <div>
            Total Supply: {formatEther(tokenData[4])} {tokenData[1]}
          </div>
          <div>Total Raised: {formatEther(tokenData[5])} VIC</div>
          <div>
            Unlock Date: {new Date(Number(tokenData[6]) * 1000).toDateString()}
          </div>
          <div>Target Liquidity: {formatEther(tokenData[7])} VIC</div>
          <div>Creator: {tokenData[8]}</div>
          <div>Is Pool Created: {tokenData[9] ? "True" : "False"}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TokenInformation;
