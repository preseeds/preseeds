import Image from "next/image";

// Define the type for collection information
interface TokenCardProps {
  name: string;
  symbol: string;
  avatar: string;
  desciption: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  name,
  symbol,
  avatar,
  desciption,
}) => {
  return (
    <div className="text-white p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#111] hover:border-white bg-[#111]">
      <div className="flex items-center space-x-4">
        <div className="w-32 h-32">
          <Image
            src={avatar}
            width={240}
            height={240}
            layout="responsive"
            quality={100}
            alt={`${name} art`}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-400">{symbol}</p>
          <div className="text-sm text-gray-400 flex">{desciption}</div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
