"use client";

import { formatEther } from "viem";
import { useState } from "react";

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
    const [hoverColor, setHoverColor] = useState<string>("transparent");
    const [isError, setIsError] = useState(false);

    const totalRaised = parseFloat(formatEther(raisedAmount));
    const totalTarget = parseFloat(formatEther(targetLiquidity));
    const progressPercentage = totalTarget > 0 ? (totalRaised / totalTarget) * 100 : 0;

    const generateRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setHoverColor(randomColor);
    };

    const resetBorderColor = () => {
        setHoverColor("transparent");
    };

    const handleError = () => {
        setIsError(true);
    };

    return (
        <div
            className="p-1 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent"
            onMouseEnter={generateRandomColor}
            onMouseLeave={resetBorderColor}
            style={{ borderColor: hoverColor }}
        >
            <div className="flex items-center space-x-2">
                <div className="w-32 h-32 overflow-hidden">
                    {!isError ? (
                        <img
                            src={avatar}
                            width={96}
                            height={96}
                            alt={`${name} avatar`}
                            className="object-cover"
                            onError={handleError}
                        />
                    ) : (
                        <video
                            width={128}
                            height={128}
                            className="object-cover"
                            muted
                            loop
                            autoPlay
                        >
                            <source src={avatar} type="video/mp4" />
                        </video>
                    )}
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
                            {progressPercentage.toFixed(2)}% raised ({totalRaised} VIC out of {totalTarget} VIC)
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenCard;
