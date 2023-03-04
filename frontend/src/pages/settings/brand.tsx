import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useSigner } from "wagmi";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	createProposalWithInstructions,
	getBrandCalldatas,
	getBrandMetadata,
	getBrandName,
	getBrandURI,
} from "@/utils/web3";

const Settings = () => {
	const { data: signer } = useSigner();

	const [value, setValue] = useLocalStorage("brand");

	const [name, setName] = useState<any>("");
	const [description, setDescription] = useState<any>("");
	const [url, setUrl] = useState<any>("");
	const [primaryColor, setPrimaryColor] = useState<any>("");
	const [logoFile, setLogoFile] = useState<any>(null);

	useEffect(() => {
		const getInitialData = async () => {
			if (value && typeof value == "object") {
				if ("name" in value) {
					setName(value?.name);
				}

				if ("description" in value) {
					setDescription(value?.description);
				}
			}

			const brandName = await getBrandName();
			setName(brandName);

			const brandURI = await getBrandURI();
			setUrl(brandURI);

			const metadata = await getBrandMetadata();
			console.log(metadata);
			if (metadata) {
				if ("description" in metadata) {
					setDescription(metadata?.description);
				}
			}
		};

		getInitialData();
	}, []);

	const updateBrand = async () => {
		const calldatas = await getBrandCalldatas(name);

		createProposalWithInstructions(
			signer,
			{
				name: "Branding update",
				description: `The following branding parameters will be updated:<br /><br />Brand Name: ${name}`,
			},
			calldatas
		);
	};

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Brand Module
					</label>
					<Link
						href="/settings"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to settings
					</Link>
				</div>
				<div className="py-2 w-full flex flex-col justify-center items-start space-y-4">
					<div className="w-full flex flex-col items-start justify-start space-y-2">
						<label>Name</label>

						<Input
							id="name"
							name="name"
							outerClassName="w-full"
							className="w-full bg-transparent text-white focus:outline-none"
							value={name}
							onChange={(event: any) => {
								setName(event.target.value);
							}}
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
							value={description}
							onChange={(event: any) => {
								setDescription(event.target.value);
							}}
						/>
					</div>

					<div className="flex flex-col items-start justify-start space-y-2">
						<label>Url</label>
						<Input
							id="name"
							name="name"
							outerClassName="w-80"
							className="w-full bg-transparent text-white font-bold focus:outline-none text-left"
							value={url}
							onChange={(event: any) => {
								setUrl(event.target.value);
							}}
							preValue="https://"
						/>
					</div>

					<div className="w-full flex justify-end">
						{name && description && url ? (
							<button
								type="button"
								onClick={updateBrand}
								className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
							>
								Next
							</button>
						) : (
							<button
								type="button"
								onClick={() => {}}
								className="px-12 py-2 text-gray-400 bg-gray-700 rounded-full text-base font-bold cursor-default"
							>
								All fields are required
							</button>
						)}
					</div>
				</div>
			</div>
		</DaoMain>
	);
};

export default Settings;
