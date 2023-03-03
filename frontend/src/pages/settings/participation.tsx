import { useState } from "react";
import Link from "next/link";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";

const Settings = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [primaryColor, setPrimaryColor] = useState("");
	const [logoFile, setLogoFile] = useState(null);

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
							placeholder="e.g. CityDAO"
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
							placeholder="e.g. CityDAO's mission is to build an on-chain, community-governed, crypto city of the future."
						/>
					</div>

					<div className="flex flex-col items-start justify-start space-y-2">
						<label>Url</label>
						<Input
							id="name"
							name="name"
							outerClassName="w-80"
							className="w-full bg-transparent text-white font-bold focus:outline-none text-right"
							value={url}
							onChange={(event: any) => {
								setUrl(event.target.value);
							}}
							placeholder="e.g. citydao"
							preValue="https://"
							postValue=".govblocks.xyz"
						/>
					</div>

					<div className="w-full flex justify-end">
						{name && description && url ? (
							<div className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold">
								Next
							</div>
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
