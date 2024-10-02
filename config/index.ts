import { defineChain } from "viem";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export const mainnet = defineChain({
  id: 88,
  name: "Viction",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
      webSocket: ["wss://ws.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://vicscan.xyz" },
  },
  testnet: false,
});

export const testnet = defineChain({
  id: 89,
  name: "Viction Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"],
      webSocket: ["wss://ws-testner.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.vicscan.xyz" },
  },
  testnet: true,
});

export const FACTORY_ADDRESS = "0x93f9e46d2c9a2B55739FCC1Ae1e208887e97e567"

export const storage = new ThirdwebStorage({
  clientId: "9e1fedfacb0e12e8df882dc5df2e17ee",
});
