import "@/styles/globals.css";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig, queryClient, initAppKit } from "@/config/reown";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initAppKit();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
