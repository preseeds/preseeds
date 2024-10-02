import TokenInformation from "@components/information";
import { Address } from "viem";

const Token = ({ params: { address } }: { params: { address: Address } }) => {
  return (
    <div>
      <TokenInformation tokenAddress={address} />
    </div>
  );
};

export default Token;
