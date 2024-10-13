import { createPublicClient, createWalletClient, defineChain, http } from "viem";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { english, generateMnemonic, mnemonicToAccount } from "viem/accounts";

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

export const network = mainnet

const account = mnemonicToAccount(generateMnemonic(english))
export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
})

export const FACTORY_ADDRESS = "0x755d81B3eB576637FB5869B8461605994B4Eb0AE"

export const storage = new ThirdwebStorage({
  clientId: "9e1fedfacb0e12e8df882dc5df2e17ee",
});
