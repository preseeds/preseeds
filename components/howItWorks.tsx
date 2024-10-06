"use client";

import { useState, useEffect } from "react";
import Modal from "./modal";

const HowItWorks: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // Set a flag in local storage to indicate the user has seen the modal
    localStorage.setItem("hasSeenHowItWorks", "true");
  };

  useEffect(() => {
    // Check local storage to see if the user has seen the "How It Works" modal
    const hasSeenHowItWorks = localStorage.getItem("hasSeenHowItWorks");
    if (!hasSeenHowItWorks) {
      setModalVisible(true);
    }
  }, []);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        How it works
      </button>

      <Modal visible={isModalVisible} onClose={closeModal} showButtonClose>
        <div className="bg-gray-900 text-white p-10 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
            How it works
          </h2>
          <p className="text-lg text-center mb-8">
            <span className="text-green-400 font-semibold">Preseeds</span> allows users to create coins on the
            <span className="text-blue-400 font-semibold"> Viciton chain</span>, providing a simple way for others to participate in early token launches. Each coin is available for everyone to buy with just a few steps.
          </p>
          <div className="space-y-6 text-center text-lg">
            <p className="text-yellow-400">
              step 1: <span className="text-white">pick a coin that interests you on the Viciton chain</span>
            </p>
            <p className="text-yellow-400">
              step 2: <span className="text-white">buy the token by sending <span className="text-green-400 font-semibold">VIC</span> to the token address</span>
            </p>
            <p className="text-yellow-400">
              step 3: <span className="text-white">the smart contract automatically mints tokens directly to your wallet address</span>
            </p>
            <p className="text-yellow-400">
              step 4: <span className="text-white">when the token reaches its target liquidity or the raising period ends, all <span className="text-green-400 font-semibold">VIC</span> sent to the contract will be deposited into the <span className="text-blue-400 font-semibold">Baryon protocol</span></span>
            </p>
            <p className="text-yellow-400">
              step 5: <span className="text-white">the liquidity token received from Baryon is then burned, ensuring trust and stability in the liquidity pool</span>
            </p>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={closeModal}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              I&apos;m ready to buy pre-seeds token
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HowItWorks;
