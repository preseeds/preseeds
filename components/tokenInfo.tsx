"use client";
import TokenAbi from "@abis/Token.json";
import { storage } from "@config/index";
import Image from "next/image";
import { Address, formatEther } from "viem";
import {
  useReadContract,
} from "wagmi";
import { FaTwitter } from "react-icons/fa";

interface Props {
  tokenAddress: Address;
}

type TokenInfo = [
  string, // name
  string, // symbol
  string, // image
  string, // description
  bigint, // total supply
  bigint, // total raised
  bigint, // unlock date
  bigint, // target liquidity
  string, // creator
  boolean, // is pool created
];

const TokenInfo: React.FC<Props> = ({ tokenAddress }) => {
  const { data } = useReadContract({
    address: tokenAddress,
    abi: TokenAbi,
    functionName: "getTokenInfo",
  });

  const requestUrl = `https://coin98.com/request?address=${tokenAddress}&amount=&chain=Viction&token=`;

  const tokenData: TokenInfo = data as TokenInfo;

  if (!tokenData) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const totalRaised = parseFloat(formatEther(tokenData[5]));
  const targetLiquidity = parseFloat(formatEther(tokenData[7]));
  const progressPercentage =
    targetLiquidity > 0 ? (totalRaised / targetLiquidity) * 100 : 0;

  // Twitter share message
  const twitterShareMessage = `${tokenData[0]} is raising at pre seeds round, all the funds is protected by Preseeds protocol. \n\nSend VIC to: ${tokenAddress} or via Coin98 Magic Link: ${requestUrl} to buy.\n\n Token ${tokenData[1]} will be minted directly to your wallet.`;

  // Condition for showing "Create Pool" button
  const unlockDateReached = Number(tokenData[6]) * 1000 <= Date.now();
  const isPoolNotCreated = !tokenData[9];

  return (
    <div className="mx-auto container my-10">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-80 mb-6 md:mb-0">
            <Image
              src={storage.resolveScheme(tokenData[2])}
              width={500}
              height={500}
              layout="responsive"
              quality={100}
              alt={`${tokenData[0]} image`}
              className="rounded-lg"
            />
          </div>
          {/* Information Section */}
          <div className="text-white space-y-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-3xl font-bold">{tokenData[0]}</h3>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    twitterShareMessage,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
              <div className="flex space-x-4">
                {unlockDateReached && isPoolNotCreated && (
                  <button
                    onClick={() => {
                      // Replace with the actual logic for creating the pool
                      console.log("Creating Pool...");
                    }}
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition"
                  >
                    Create Pool
                  </button>
                )}
              </div>
            </div>
            <p className="text-lg text-gray-400">{tokenData[1]}</p>
            <p className="text-sm text-gray-300">{tokenData[3]}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-4">
              <div>
                <span className="font-semibold">Creator:</span> {tokenData[8]}
              </div>
              <div>
                <span className="font-semibold">Unlock Date:</span>{" "}
                {new Date(Number(tokenData[6]) * 1000).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Is Pool Created:</span>{" "}
                {tokenData[9] ? "True" : "False"}
              </div>
            </div>
            {/* Funding Progress Section */}
            <div className="mt-6">
              <div className="font-semibold text-sm mb-2">Funding Progress</div>
              <div className="w-full bg-gray-800 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {progressPercentage.toFixed(2)}% raised ({totalRaised} VIC out
                of {targetLiquidity} VIC)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
