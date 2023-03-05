import Link from "next/link";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { useLocalStorage } from "react-use";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	createProposalWithInstructions,
	getMembershipCalldatas,
	getMembershipMaxSupply,
	getMembershipMintPrice,
	getMembershipMetadata,
	getMembershipTotalSupply,
} from "@/utils/web3";

const Settings = () => {
	const [value, setValue] = useLocalStorage("memberships");
	const { data: signer } = useSigner();

	const [membershipMetadata, setMembershipMetadata] = useState<any>(null);
	const [nftImage, setNftImage] = useState<any>(null);
	const [nftName, setNftName] = useState<any>("");
	const [nftDescription, setNftDescription] = useState<any>("");
	const [nftQuantity, setNftQuantity] = useState<any>(0);
	const [nftPrice, setNftPrice] = useState<any>(0);

	useEffect(() => {
		const getInitialData = async () => {
			const metadata = await getMembershipMetadata();

			if (metadata) {
				if ("image" in metadata) {
					setNftImage(metadata.image);
				}
				if ("name" in metadata) {
					setNftName(metadata.name);
				}
				if ("description" in metadata) {
					setNftDescription(metadata.description);
				}
			}

			metadata.price = await getMembershipMintPrice();
			metadata.quantity = await getMembershipMaxSupply();

			if ("price" in metadata) {
				setNftPrice(metadata.price);
			}
			if ("quantity" in metadata) {
				setNftQuantity(metadata.quantity);
			}

			setValue(metadata);
		};

		getInitialData();
	}, []);

	const updateMembership = async () => {
		const calldatas = await getMembershipCalldatas(nftQuantity, nftPrice);

		createProposalWithInstructions(
			signer,
			{
				name: "Token Details update",
				description: `The following token parameters will be updated:<br /><br />Total Quantity: ${nftQuantity}<br /><br />Price: ${nftPrice}`,
			},
			calldatas
		);
	};

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Token Details
					</label>
					<Link
						href="/settings"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to settings
					</Link>
				</div>
				<div className="py-2 w-full flex flex-col justify-center items-start space-y-4">
					<div className="pt-4 w-full flex flex-col justify-start items-start space-y-6">
						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Image</label>
							{nftImage && (
								<div className="flex flex-col justify-center items-start space-y-2">
									<img
										src={nftImage}
										className="max-w-[16rem] max-h-[16rem] bg-black rounded-3xl"
									/>
								</div>
							)}
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Name</label>
							<div className="font-semibold">{nftName}</div>
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Description</label>
							<div className="font-semibold">
								{nftDescription}
							</div>
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Update Quantity</label>

							<Input
								id="name"
								name="name"
								type={"number"}
								outerClassName="w-64"
								className="w-full bg-transparent text-white focus:outline-none"
								value={nftQuantity}
								onChange={(event: any) => {
									setNftQuantity(event.target.value);
								}}
								placeholder="e.g. 10,000"
							/>
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Update Price</label>

							<Input
								id="name"
								name="name"
								type={"number"}
								outerClassName="w-64"
								className="w-full bg-transparent text-white focus:outline-none"
								value={nftPrice}
								onChange={(event: any) => {
									setNftPrice(event.target.value);
								}}
								placeholder="e.g. 10,000"
							/>
						</div>
					</div>

					<div className="pt-8">
						<div className="px-8 py-2 text-gray-400 bg-gray-700 rounded-full text-base font-bold cursor-default">
							Add new membership (Coming soon)
						</div>
					</div>

					<div className="w-full flex justify-end">
						{nftQuantity && nftPrice ? (
							<button
								type="button"
								onClick={updateMembership}
								className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
							>
								Update
							</button>
						) : (
							<div className="px-12 py-2 text-gray-400 bg-gray-700 rounded-full text-base font-bold cursor-default">
								All fields are required
							</div>
						)}
					</div>
				</div>
			</div>
		</DaoMain>
	);
};

export default Settings;
