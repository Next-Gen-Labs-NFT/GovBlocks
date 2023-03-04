import { useState, useEffect } from "react";
import Link from "next/link";

import { useLocalStorage } from "react-use";
import { useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";

import {
	getBrandName,
	getBrandURI,
	getBrandMetadata,
	createProposal,
} from "@/utils/web3";

const Create = () => {
	const { data: signer } = useSigner();

	const [badgeImage, setBadgeImage] = useState(null);
	const [badgeName, setBadgeName] = useState("");
	const [badgeDescription, setBadgeDescription] = useState("");
	const [badgeQuantity, setBadgeQuantity] = useState(0);
	const [badgeClaimDeadline, setBadgeClaimDeadline] = useState(0);

	const onBadgeImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			setBadgeImage(event.target.files[0]);
		}
	};

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Create Custom Badge
					</label>
					<Link
						href="/dashboard"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to dashboard
					</Link>
				</div>
				<div className="py-2 w-full flex flex-col justify-center items-start space-y-4">
					<div className="pt-8 w-full flex flex-col justify-start items-start space-y-4">
						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Image</label>
							{badgeImage ? (
								<div className="flex flex-col justify-center items-start space-y-2">
									<img
										src={URL.createObjectURL(badgeImage)}
										className="max-w-[8rem] max-h-[8rem] bg-black rounded-3xl"
									/>
									<button
										type="button"
										onClick={() => setBadgeImage(null)}
										className="px-6 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base"
									>
										Remove
									</button>
								</div>
							) : (
								<input
									type="file"
									name="nftImage"
									onChange={onBadgeImageChange}
									accept="image/*"
									className="px-6 py-2 border border-gray-700 hover:border-gray-500 rounded-full"
								/>
							)}
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Name</label>

							<Input
								id="name"
								name="name"
								outerClassName="w-full"
								className="w-full bg-transparent text-white focus:outline-none"
								value={badgeName}
								onChange={(event: any) => {
									setBadgeName(event.target.value);
								}}
								placeholder="e.g. CityDAO Citizen"
							/>
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Description</label>

							<TextArea
								id="description"
								name="description"
								outerClassName="w-full"
								className="w-full bg-transparent text-white focus:outline-none"
								rows={6}
								value={badgeDescription}
								onChange={(event: any) => {
									setBadgeDescription(event.target.value);
								}}
								placeholder="e.g. Special privileges: Early access to participate in CityDAO activities like land drops, access to Citizens-only Discord channels, voting power. Does not grant ownership of land."
							/>
						</div>

						<div className="w-full flex flex-col items-start justify-start space-y-2">
							<label>Quantity</label>

							<Input
								id="name"
								name="name"
								type={"number"}
								outerClassName="w-64"
								className="w-full bg-transparent text-white focus:outline-none"
								value={badgeQuantity}
								onChange={(event: any) => {
									setBadgeQuantity(event.target.value);
								}}
								placeholder="e.g. 10,000"
							/>
						</div>
					</div>

					<div className="w-full flex justify-end">
						{badgeImage &&
						badgeName &&
						badgeDescription &&
						badgeQuantity ? (
							<button
								type="button"
								onClick={async () => {
									await createProposal(signer, {
										name,
										description,
									});
								}}
								className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
							>
								Submit
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

export default Create;
