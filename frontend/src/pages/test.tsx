import { useState } from "react";
import { useAccount, useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { setBrandUri } from "@/utils/web3";

const Index = () => {
	const { data: signer } = useSigner();
	const { address } = useAccount();

	return (
		<Main
			meta={
				<Meta
					title="ETHDenver 2023 Buidlathon Bounties"
					description=""
				/>
			}
		>
			<div>
				<button
					onClick={() => {
						setBrandUri(address, signer, "https://test1");
					}}
				>
					Set Brand URI
				</button>
			</div>
		</Main>
	);
};

export default Index;
