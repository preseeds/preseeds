"use client";

import { useState } from "react";
import { Address } from "viem";
import { FaQrcode, FaCopy } from "react-icons/fa";
import Modal from "./modal";
import QRCode from "react-qr-code";

interface BuyInfoProps {
  address: Address;
}

const BuyInfo: React.FC<BuyInfoProps> = ({ address }) => {
  const [isQrModalVisible, setQrModalVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const requestUrl = `https://coin98.com/request?address=${address}&amount=&chain=Viction&token=`;

  const openQrModal = () => {
    setQrModalVisible(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeQrModal = () => {
    setQrModalVisible(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
  };

  return (
    <div className="bg-green-900 text-white p-4 rounded-lg shadow-md mb-6">
      <p className="text-lg flex items-center flex-wrap">
        To buy this token, send VIC to address{" "}
        <span className="font-semibold ml-1 break-all">{address}</span>
        <button
          onClick={openQrModal}
          aria-label="Show QR Code"
          className="ml-2"
        >
          <FaQrcode
            className="text-white hover:text-blue-500 transition"
            size={30}
          />
        </button>{" "}
        or via:{" "}
        <a
          href={requestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:text-blue-600 transition ml-1"
        >
          Coin98 Wallet Request Send
        </a>
      </p>{" "}
      {/* QR Code Modal */}
      {isQrModalVisible && (
        <Modal
          visible={isQrModalVisible}
          onClose={closeQrModal}
          showButtonClose
        >
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={requestUrl} size={150} />
            </div>
            <div className="flex flex-col items-center mt-4">
              <p className="text-center text-lg font-semibold break-all">
                Address: {address}
              </p>
              <button
                onClick={handleCopyAddress}
                className="mt-2 text-blue-300 hover:text-blue-500 transition"
                aria-label="Copy Address"
              >
                <FaCopy size={20} />
              </button>
              {isCopied && (
                <p className="text-green-500 mt-2">Address copied!</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyInfo;
