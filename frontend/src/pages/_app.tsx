import "../styles/global.css";

import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { baseGoerli, polygonMumbai } from "wagmi/chains";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = "24ed7e10fe8e4458e8554c3d3498ac6e";

// 2. Configure wagmi client
const chains = [polygonMumbai, baseGoerli];

const { provider } = configureChains(chains, [
	walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: modalConnectors({
		version: "1",
		appName: "web3Modal",
		chains,
		projectId,
	}),
	provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState<any>(false);

	useEffect(() => {
		setReady(true);
	}, []);

	return (
		<>
			{ready ? (
				<WagmiConfig client={wagmiClient}>
					<Component {...pageProps} />
				</WagmiConfig>
			) : null}

			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</>
	);
}
