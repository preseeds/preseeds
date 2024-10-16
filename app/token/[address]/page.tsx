import { Metadata } from "next";
import TokenInfo from "@components/tokenInfo";
import BuyInfo from "@components/buyInfo";
import { Address } from "viem";

export async function generateMetadata({ params }: { params: { address: Address } }): Promise<Metadata> {
    const { address } = params;

    return {
        title: `Token ${address} Details`,
        description: `View details and buy options for token at address ${address}`,
        openGraph: {
            title: `Token ${address} - Buy Info`,
            description: `Explore buying options and detailed information for token at address ${address}`,
            url: `https://preseeds.meme/token/${address}`,
            type: 'website',
        },
    };
}

const Token = ({ params: { address } }: { params: { address: Address } }) => {
    return (
        <div className="mx-auto container my-10">
            <BuyInfo address={address} />
            <TokenInfo tokenAddress={address} />
        </div>
    );
};

export default Token;
