"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { structuralSharing } from "@wagmi/core/query";
import { mainnet, testnet } from "@config/index";
import Nav from "@components/nav";

const config = getDefaultConfig({
  appName: "Preseeds Trade",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, testnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColorForeground: "white",
            borderRadius: "none",
            // fontStack: "system",
            overlayBlur: "large",
          })}
        >
          <Nav>{children}</Nav>
        </RainbowKitProvider>
      </QueryClientProvider>
      <ProgressBar
        color="#ffffff"
        height="2px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </WagmiProvider>
  );
};

export default Providers;
