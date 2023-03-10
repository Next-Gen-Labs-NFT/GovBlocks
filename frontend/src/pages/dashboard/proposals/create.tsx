import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useSigner } from "wagmi";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	createProposal,
	getBrandMetadata,
	getBrandName,
	getBrandURI,
} from "@/utils/web3";

const Create = () => {
	const router = useRouter();
	const { data: signer } = useSigner();

	const [name, setName] = useState<any>("");
	const [description, setDescription] = useState<any>("");
	const [instructions, setInstructions] = useState<any>("");

	const onCreateProposal = async () => {
		await createProposal(signer, {
			name,
			description,
		});

		router.push("/dashboard");
	};

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Create Proposal
					</label>
					<Link
						href="/dashboard"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to dashboard
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

					<div className="w-full flex justify-end">
						{name && description ? (
							<button
								type="button"
								onClick={onCreateProposal}
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
