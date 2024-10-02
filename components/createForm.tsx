"use client";
import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import FactoryAbi from "@abis/Factory.json"
import { FACTORY_ADDRESS, storage } from "@config/index";
import { hashMessage, parseEther } from "viem";

const CreateForm = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const { writeContract, data: txHash, error } = useWriteContract();
  console.log("Error", error);
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  console.log("receipt", receipt);

  const onCreateToken = async () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
      return;
    }

    const imageIpfsUrl = await storage.upload(image as File, {
      uploadWithoutDirectory: true,
    });

    writeContract({
      abi: FactoryAbi,
      address: FACTORY_ADDRESS,
      functionName: "createToken",
      value: parseEther("1"),
      args: [name, symbol, imageIpfsUrl, description, 86400, 0, hashMessage((new Date()).toISOString())],
    })
  };

  return (
    <div className="lg:col-span-7 w-1/2">
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter NFT Name"
          />
        </div>

        {/* Symbol Input */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="symbol">
            Symbol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter NFT Symbol"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter NFT Description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="art">
            Image <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col items-center justify-center w-full h-44 bg-[#242424] border-2 border-dashed border-gray-500">
            <label
              htmlFor="image"
              className="px-6 py-3 bg-[#2E2C2C] text-white cursor-pointer hover:bg-[#3A3A3A] focus:outline-none"
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

        {/* Submit Button */}
        <div>
          <button
            className="py-3 px-6 bg-teal-500 text-white font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 w-full mb-10"
            onClick={onCreateToken}
          >
            {isConnected ? "Create Token" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
