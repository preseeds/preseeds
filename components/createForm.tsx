"use client";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import FactoryAbi from "@abis/Factory.json";
import { client, FACTORY_ADDRESS, storage } from "@config/index";
import {
  encodeFunctionData,
  hashMessage,
  Hex,
  parseEther,
  parseEventLogs,
} from "viem";
import Modal from "./modal";
import { CHAIN_TYPE, OneID } from "@oneid-xyz/inspect";
import Link from "next/link";

const CreateForm = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [targetLiquidity, setTargetLiquidity] = useState<string>("0");
  const [feeReceiver, setFeeReceiver] = useState<string>("");
  const [addressReceiver, setAddressReceiver] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [unlockTime, setUnlockTime] = useState<number>(86400); // Default value: 1 day in seconds
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [txHash, setTxHash] = useState<Hex | undefined>();
  const [oneIdState, setOneIdState] = useState<OneID | undefined>();
  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const onCreateToken = async () => {
    const missFields = [];
    if (!name) missFields.push("Name");
    if (!symbol) missFields.push("Symbol");
    if (Number(targetLiquidity) <= 0) missFields.push("Target Liquidity");
    if (!feeReceiver) missFields.push("Fee Receiver");
    if (!image) missFields.push("Image");
    if (missFields.length) {
      setMissingFields(missFields);
      return;
    }
    setIsUploading(true);
    const imageIpfsUrl = await storage.upload(image as File, {
      uploadWithoutDirectory: true,
    });

    const hash = await client.sendTransaction({
      to: FACTORY_ADDRESS,
      data: encodeFunctionData({
        abi: FactoryAbi,
        functionName: "createToken",
        args: [
          name,
          symbol,
          imageIpfsUrl,
          description,
          unlockTime,
          parseEther(targetLiquidity),
          addressReceiver ? addressReceiver : feeReceiver,
          hashMessage(new Date().toISOString()),
        ],
      }),
    });

    setTxHash(hash);
  };
  
  useEffect(() => {
    if (missingFields.length) {
      setMissingFields([]);
    }
  }, [name, symbol, description, targetLiquidity, feeReceiver, image]);

  useEffect(() => {
    const fetchOneIdLinkedWallet = async () => {
      let oneId = oneIdState;
      if (!oneId) {
        oneId = new OneID();
        await oneId.systemConfig.initConfig();
        setOneIdState(oneId);
      }

      try {
        setAddressReceiver("loading");
        const address = await oneId.getWalletsByID(
          feeReceiver,
          CHAIN_TYPE.TOMO
        );
        if (address) {
          setAddressReceiver(address[0].address);
        }
      } catch (e) {
        console.error(e);
        setAddressReceiver("Not Found");
      }
    };
    if (feeReceiver.includes(".")) {
      fetchOneIdLinkedWallet();
    }
  }, [feeReceiver]);

  if (receipt) {
    const logs = parseEventLogs({
      abi: FactoryAbi,
      logs: receipt.logs,
    });

    const tokenAddress = logs.find(
      // eslint-disable-next-line
      (log: any) => log.eventName === "CreateToken"
      // eslint-disable-next-line
      // @ts-ignore
    )?.args?.token;

    return (
      <div className="lg:col-span-7 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        New token created with address:{" "}
        <Link href={`/token/${tokenAddress}`} className="text-red-300">
          {tokenAddress}
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          {missingFields.includes("Name") && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
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
          {missingFields.includes("Symbol") && (
            <span className="text-red-500 text-sm">Symbol is required</span>
          )}
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
          <label
            className="block text-lg font-semibold"
            htmlFor="targetLiquidity"
          >
            <span className="tooltip">
              ⓘ{" "}
              <span className="tooltiptext">
                When the target liquidity is reached, the pool will be
                automatically created.
              </span>
            </span>
            Target Liquidity (in VIC) <span className="text-red-500">*</span>
          </label>
          {missingFields.includes("Target Liquidity") && (
            <span className="text-red-500 text-sm">Target Liquidity must be greater than 0</span>
          )}
          <input
            type="number"
            id="targetLiquidity"
            value={targetLiquidity}
            onChange={(e) => setTargetLiquidity(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Target Liquidity"
          />
        </div>

        {/* Unlock Time Select */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="unlockTime">
            <span className="tooltip">
              ⓘ{" "}
              <span className="tooltiptext">
                After the unlock, the pool will be created for any amount.
              </span>
            </span>
            Unlock Time<span className="text-red-500">*</span>
          </label>
          <select
            id="unlockTime"
            value={unlockTime}
            onChange={(e) => setUnlockTime(Number(e.target.value))}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={86400}>1 Day</option> {/* 1 day in seconds */}
            <option value={604800}>7 Days</option> {/* 7 days in seconds */}
            <option value={2592000}>1 Month</option> {/* 30 days in seconds */}
          </select>
        </div>

        {/* Fee Receiver Input */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="feeReceiver">
            Fee Receiver (Creator will receive 2% of raised VIC if pool is
            created) <span className="text-red-500">*</span>
          </label>
          {missingFields.includes("Fee Receiver") && (
            <span className="text-red-500 text-sm">Fee Receiver is required</span>
          )}
          <input
            type="text"
            id="feeReceiver"
            value={feeReceiver}
            onChange={(e) => setFeeReceiver(e.target.value)}
            className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Address or Oneid"
          />
        </div>

        {/* OneId Receiver Input */}
        {addressReceiver && (
          <div>
            <label
              className="block text-lg font-semibold"
              htmlFor="addressReceiver"
            >
              OneId Linked Address
            </label>
            <input
              type="text"
              id="addressReceiver"
              disabled
              value={addressReceiver}
              className="w-full px-4 py-2 bg-[#242424] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

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
          <label className="block text-lg font-semibold mb-2" htmlFor="image">
            Image <span className="text-red-500">*</span>
          </label>
          {missingFields.includes("Fee Receiver") && (
            <span className="text-red-500 text-sm">Fee Receiver is required</span>
          )}
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

        {/* Submit Button */}
        <div>
          <button
            className="py-3 px-6 bg-teal-500 text-white font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 w-full mb-10 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 rounded-lg"
            onClick={onCreateToken}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Create Token"}
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
