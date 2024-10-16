"use client";

import Image from "next/image";
import { formatEther } from "viem";

interface TokenCardProps {
  name: string;
  symbol: string;
  avatar: string;
  isPoolCreated: boolean;
  raisedAmount: bigint;
  targetLiquidity: bigint;
}

const TokenCard: React.FC<TokenCardProps> = ({
                                               name,
                                               symbol,
                                               avatar,
                                               isPoolCreated,
                                               raisedAmount,
                                               targetLiquidity,
                                             }) => {
  const totalRaised = parseFloat(formatEther(raisedAmount));
  const totalTarget = parseFloat(formatEther(targetLiquidity));
  const progressPercentage =
      totalTarget > 0 ? (totalRaised / totalTarget) * 100 : 0;

  return (
      <div className="p-1 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-[#86EFAC]">
        <div className="flex items-center space-x-2">
          <div className="w-32 h-32 overflow-hidden">
            <Image
                src={avatar}
                width={96}
                height={96}
                alt={`${name} avatar`}
                className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{symbol}</p>
          </div>
        </div>
        <div>
          {isPoolCreated ? (
              <p>Pool has been created</p>
          ) : (
              <div>
                <div className="font-semibold text-sm text-gray-300 mb-2">
                  Funding Progress
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div
                      className="bg-green-500 h-4 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {progressPercentage.toFixed(2)}% raised ({totalRaised} VIC out of{" "}
                  {totalTarget} VIC)
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default TokenCard;
