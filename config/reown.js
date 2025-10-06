import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// Define supported chains and transports
const chains = [mainnet, polygon];
const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
};

// Export Wagmi config and a shared QueryClient instance
export const wagmiConfig = createConfig({ chains, transports });
export const queryClient = new QueryClient();

let appKitInitialized = false;

export function initAppKit() {
  if (appKitInitialized) return;
  if (!projectId) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("NEXT_PUBLIC_PROJECT_ID is not set. Reown AppKit not initialized.");
    }
    return;
  }

  const wagmiAdapter = new WagmiAdapter({ networks: chains, projectId, transports });

  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: chains,
  });

  appKitInitialized = true;
}

// Re-export for convenience if needed elsewhere
export { WagmiProvider };


