"use client";
import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import FactoryAbi from "@abis/Factory.json";
import { FACTORY_ADDRESS, storage } from "@config/index";
import { hashMessage, parseEther, parseEventLogs } from "viem";
import Modal from "./modal";
import Link from "next/link";

const CreateForm = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [targetLiquidity, setTargetLiquidity] = useState<string>("0");
  const [image, setImage] = useState<File | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const { writeContract, data: txHash, error } = useWriteContract();
  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const onCreateToken = async () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
      return;
    }

    setIsUploading(true);
    const imageIpfsUrl = await storage.upload(image as File, {
      uploadWithoutDirectory: true,
    });

    writeContract({
      abi: FactoryAbi,
      address: FACTORY_ADDRESS,
      functionName: "createToken",
      value: parseEther("3"),
      args: [
        name,
        symbol,
        imageIpfsUrl,
        description,
        86400,
        parseEther(targetLiquidity),
        hashMessage(new Date().toISOString()),
      ],
    });
  };

  if (receipt) {
    const logs = parseEventLogs({
      abi: FactoryAbi,
      logs: receipt.logs,
    });

    const tokenAddress = logs.find(
      // eslint-disable-next-line
      (log: any) => log.eventName === "CreateToken",
      // eslint-disable-next-line
      // @ts-ignore
    )?.args?.token;

    return (
      <div className="lg:col-span-7 w-1/2">
        New token created with address:{" "}
        <Link href={`/token/${tokenAddress}`} className="text-red-300">
          {tokenAddress}
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 w-1/2">
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Token Name"
          />
        </div>

        {/* Symbol Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="symbol">
            Symbol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Token Symbol"
          />
        </div>

        {/* Target Liquidity Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="symbol">
            Target Liquidity (in VIC) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="targetLiquidity"
            value={targetLiquidity}
            onChange={(e) => setTargetLiquidity(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Token Symbol"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Token Description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="art">
            Image <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col items-center justify-center w-full h-44 bg-[#242424] rounded-lg border-2 border-dashed border-gray-500">
            <label
              htmlFor="image"
              className="px-6 py-3 bg-[#2E2C2C] text-white cursor-pointer hover:bg-[#3A3A3A] focus:outline-none rounded-lg"
            >
              Upload File
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files?.[0])}
              accept="image/*,video/*,audio/*,.svg,.gif,.webm,.wav,.mp4"
              className="hidden"
            />
            {image ? (
              <span className="text-sm text-gray-400 mt-2">{image.name}</span>
            ) : (
              <span className="text-sm text-gray-400 mt-2">
                JPG, PNG, SVG, GIF, MP4, WEBM, WAV
              </span>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error.name}</p>}

        {/* Submit Button */}
        <div>
          <button
            className="py-3 px-6 bg-teal-500 text-white font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 w-full mb-10 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 rounded-lg"
            onClick={onCreateToken}
            disabled={isUploading}
          >
            {isConnected
              ? isUploading
                ? "Uploading..."
                : "Create Token"
              : "Connect Wallet"}
          </button>
        </div>
      </div>

      {isLoading && (
        <Modal visible={true} onClose={() => {}}>
          <div className="text-center">Wait for transaction confirmation</div>
        </Modal>
      )}
    </div>
  );
};

export default CreateForm;
