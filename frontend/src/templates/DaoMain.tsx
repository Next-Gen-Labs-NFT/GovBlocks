import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useAccount } from "wagmi";

import { MenuDrop } from "@/components/menu";
import { Wallet } from "@/components/wallet";
import { getBrandMetadata, getNftStorageURI } from "@/utils/web3";

type IMainProps = {
	meta: ReactNode;
	children: ReactNode;
};

const DaoMain = (props: IMainProps) => {
	const router = useRouter();
	const { isConnected } = useAccount();
	const [value, setValue] = useLocalStorage("brand");

	const [logo, setLogo] = useState<any>(null);

	useEffect(() => {
		const isDomain = location.hostname.split(".").length < 3;

		if (isDomain) {
			router.push("/");
		}

		const getInitialData = async () => {
			if (value && typeof value == "object") {
				if ("logo" in value && typeof value?.logo == "string") {
					const logoURI = await getNftStorageURI(value?.logo);
					setLogo(logoURI);
				}
			}

			const metadata = await getBrandMetadata();
			setValue(metadata);
			if (metadata) {
				if ("logo" in metadata) {
					const logoURI = await getNftStorageURI(metadata?.logo);
					setLogo(logoURI);
				}
			}
		};

		getInitialData();
	}, []);

	return (
		<div className="w-full px-1 text-white antialiased">
			{props.meta}

			<div className="min-h-screen flex flex-col">
				<header className="py-3 border-b border-gray-700">
					<div className="mx-auto max-w-screen-lg flex flex-row justify-between items-center">
						<Link
							href="/dashboard"
							className="text-2xl font-semibold text-primary-200"
						>
							{logo && <img src={logo} />}
						</Link>
						<div className="flex flex-row justify-end items-center space-x-2">
							<Wallet bigView={false} />
							<MenuDrop />
						</div>
					</div>
				</header>

				<main className="py-8 flex flex-col justify-center items-center grow">
					{isConnected ? props.children : <Wallet bigView />}
				</main>
			</div>
		</div>
	);
};

export { DaoMain };
