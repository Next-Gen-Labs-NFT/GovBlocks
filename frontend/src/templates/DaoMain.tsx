/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import { Wallet } from "@/components/wallet";
import { MenuDrop } from "@/components/menu";

import { getNftStorageURI, getBrandMetadata } from "@/utils/web3";

type IMainProps = {
	meta: ReactNode;
	children: ReactNode;
};

const DaoMain = (props: IMainProps) => {
	const router = useRouter();
	const [value, setValue] = useLocalStorage("brand");

	const [logo, setLogo] = useState(null);

	useEffect(() => {
		const isDomain = location.hostname.split(".").length < 3;

		if (isDomain) {
			router.push("/");
		}

		const getInitialData = async () => {
			if (value) {
				if ("logo" in value) {
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
							<Wallet />
							<MenuDrop />
						</div>
					</div>
				</header>

				<main className="py-8 flex flex-col grow">
					{props.children}
				</main>
			</div>
		</div>
	);
};

export { DaoMain };
