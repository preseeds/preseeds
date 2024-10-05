"use client";
import TokenInfo from "@components/tokenInfo";
import BuyInfo from "@components/buyInfo"; // Import BuyInfo component
import { Address } from "viem";

const Token = ({ params: { address } }: { params: { address: Address } }) => {
  return (
    <div className="mx-auto container my-10">
      {/* Buy Info Component */}
      <BuyInfo address={address} />
      
      {/* Token Information Component */}
      <TokenInfo tokenAddress={address} />
    </div>
  );
};

export default Token;
