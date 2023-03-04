import { useState, useEffect } from "react";

import { useAccount } from "wagmi";
import { useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Wallet } from "@/components/wallet";

import { getClassNames } from "@/utils/classnames";

const Index = () => {
	const { isConnected } = useAccount();

	const [currentStep, setCurrentStep] = useState(0);

	const [membershipModule, setMembershipModule] = useState(null);
	const [governancePlatform, setGovernancePlatform] = useState(null);
	const [governanceModule, setGovernanceModule] = useState(null);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [primaryColor, setPrimaryColor] = useState("");
	const [logoFile, setLogoFile] = useState(null);

	const [nftImage, setNftImage] = useState(null);
	const [nftName, setNftName] = useState("");
	const [nftDescription, setNftDescription] = useState("");
	const [nftQuantity, setNftQuantity] = useState(0);
	const [nftPrice, setNftPrice] = useState(0);

	const [governanceThreshold, setGovernanceThreshold] = useState(0);
	const [governanceQuorum, setGovernanceQuorum] = useState(0);
	const [governanceVoteDuration, setGovernanceVoteDuration] = useState(0);
	const [governanceVoteStreak, setGovernanceVoteStreak] = useState(0);
	const [governanceVoteStreakMultiplier, setGovernanceVoteStreakMultiplier] =
		useState(0);
	const [governanceNoVoteStreak, setGovernanceNoVoteStreakMultiplier] =
		useState(0);
	const [
		governanceNoVoteStreakVotePenalty,
		setGovernanceNoVoteStreakVotePenalty,
	] = useState(0);
	const [
		governanceNoVoteStreakMonetaryPenalty,
		setGovernanceNoVoteStreakMonetaryPenalty,
	] = useState(0);

	const { data: signer } = useSigner();

	useEffect(() => {
		if (isConnected) {
			if (currentStep == 0) setCurrentStep(1);
		} else {
			setCurrentStep(0);
		}
	}, [isConnected]);

	const onNftImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			setNftImage(event.target.files[0]);
		}
	};

	const steps = [
		{
			id: 0,
			name: "Connect Wallet",
		},
		{
			id: 1,
			name: "Community",
		},
		{
			id: 2,
			name: "Roles",
		},
		{
			id: 3,
			name: "Membership",
		},
		{
			id: 4,
			name: "Governaance",
		},
		{
			id: 5,
			name: "Participation",
		},
		{
			id: 6,
			name: "Review",
		},
	];

	enum MembershipType {
		ERC721,
		ERC1155,
		ERC20,
		ERC5643,
		ERC4907,
		ERC5320,
	}

	const membershipModules = [
		{
			id: MembershipType.ERC721,
			name: "NFT",
			description: "ERC 721",
			active: true,
		},
		{
			id: MembershipType.ERC1155,
			name: "NFT",
			description: "ERC 1155",
			active: false,
		},
		{
			id: MembershipType.ERC20,
			name: "Token",
			description: "ERC 20",
			active: false,
		},
		{
			id: MembershipType.ERC5643,
			name: "Subscription",
			description: "ERC 5643",
			active: false,
		},
		{
			id: MembershipType.ERC4907,
			name: "Lease",
			description: "ERC 4907",
			active: false,
		},
		{
			id: MembershipType.ERC5320,
			name: "Harberger Taxes",
			description: "ERC 5320",
			active: false,
		},
	];

	enum GovernanceType {
		VOTE,
		VOTEPARTICIPATION,
		SNAPSHOT,
		TALLY,
	}

	const governanceModules = [
		{
			id: GovernanceType.VOTE,
			name: "GovBlocks",
			description: "Based on GovBlocks voting results",
			active: true,
		},

		{
			id: GovernanceType.SNAPSHOT,
			name: "Snapshot",
			description: "Based on Snapshot(off-chain) voting results",
			active: false,
		},
		{
			id: GovernanceType.TALLY,
			name: "Tally",
			description: "Based on Tally(on-chain) voting results",
			active: false,
		},
	];

	const govBlocksGovernanceModules = [
		{
			id: GovernanceType.VOTE,
			name: "Standard",
			description: "Based on NFTs & Tokens",
			active: true,
		},
		{
			id: GovernanceType.VOTEPARTICIPATION,
			name: "Standard + Participation",
			description:
				"Based on NFTs & Tokens, weighted voting using voting streaks and participation tokens",
			active: true,
		},
	];

	/*
   {
      id: GovernanceType.VOTEPARTICIPATION,
      name: "Participation",
      description:
        "Based on just NFTs and Tokens & participation in the community",
      active: true,
    },
    */

	return (
		<Main meta={<Meta title="Create" description="" />}>
			<>
				<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
					<div className="w-full flex flex-row justify-between items-start gap-8">
						<div className="px-8 py-8 w-1/4 flex flex-col justify-center items-center border border-gray-700 rounded-3xl flow-root">
							<ol
								role="list"
								className="flex flex-col justify-center items-center space-y-4"
							>
								{steps.map((step, index) => (
									<li
										key={index}
										className="w-full flex justify-start items-center space-x-4"
										aria-current="step"
									>
										<div
											className={getClassNames(
												"w-8 h-8 flex justify-center items-center font-bold rounded-full",
												currentStep >= step.id
													? "bg-primary"
													: "bg-gray-700"
											)}
										>
											<span>{step.id + 1}</span>
										</div>
										<span
											className={getClassNames(
												"text-base",
												currentStep >= step.id
													? "text-white font-medium"
													: "text-gray-700"
											)}
										>
											{step.name}
										</span>
									</li>
								))}
							</ol>
						</div>

						<div className="p-8 w-3/4 flex flex-col justify-start items-start space-y-4 border border-gray-700 rounded-3xl">
							{currentStep == 0 && (
								<div className="flex flex-col items-start justify-start space-y-4">
									<div className="">
										To get started, connect your wallet.
									</div>
									<Wallet />
								</div>
							)}

							{currentStep == 1 && (
								<>
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
												setDescription(
													event.target.value
												);
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
											className="w-full bg-transparent text-white font-bold focus:outline-none text-left"
											value={url}
											onChange={(event: any) => {
												setUrl(event.target.value);
											}}
											placeholder="e.g. citydao"
											preValue="https://"
										/>
									</div>

									<div className="w-full flex justify-end">
										{name && description && url ? (
											<button
												type="button"
												onClick={() =>
													setCurrentStep(
														currentStep + 2
													)
												}
												className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
											>
												Next
											</button>
										) : (
											<button
												type="button"
												onClick={() => {}}
												className="px-12 py-2 bg-gray-700 rounded-full text-base font-bold"
											>
												All fields are required
											</button>
										)}
									</div>
								</>
							)}

							{currentStep == 2 && (
								<>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label>Address</label>
										<Input
											id="address"
											name="address"
											outerClassName="w-full"
											className="w-full bg-transparent text-white focus:outline-none"
											value={name}
											onChange={(event: any) => {
												setName(event.target.value);
											}}
											placeholder="e.g. 0xfdc148069AB770f56b762b508384d515583576a8"
										/>
									</div>

									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label>Address</label>
										<Input
											id="address"
											name="address"
											outerClassName="w-full"
											className="w-full bg-transparent text-white focus:outline-none"
											value={name}
											onChange={(event: any) => {
												setName(event.target.value);
											}}
											placeholder="e.g. 0xfdc148069AB770f56b762b508384d515583576a8"
										/>
									</div>
								</>
							)}

							{currentStep == 3 && (
								<>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label className="pb-2 font-semibold">
											Select membership block
										</label>

										<div className="w-full grid grid-cols-4 gap-4">
											{membershipModule ? (
												<>
													<div
														className={getClassNames(
															"p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",

															"border-gray-700"
														)}
													>
														<div className="text-lg font-semibold text-left">
															{
																membershipModule?.name
															}
														</div>
														<div className="text-sm text-left">
															{
																membershipModule?.description
															}
														</div>
													</div>
													<button
														type="button"
														onClick={() =>
															setMembershipModule(
																null
															)
														}
														className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-700 hover:border-gray-500 rounded-3xl"
													>
														<div className="text-base font-semibold text-left">
															I changed my mind
														</div>
													</button>
												</>
											) : (
												<>
													{membershipModules.map(
														(module, index) => (
															<button
																key={index}
																type="button"
																onClick={() => {
																	if (
																		module.active
																	)
																		setMembershipModule(
																			module
																		);
																}}
																className={getClassNames(
																	"p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
																	module.active
																		? "border-gray-700 hover:border-gray-500"
																		: "border-gray-800 cursor-default"
																)}
															>
																<div
																	className={getClassNames(
																		module.active
																			? "text-white"
																			: "text-gray-500"
																	)}
																>
																	<div className="text-lg font-semibold text-left">
																		{
																			module.name
																		}
																	</div>
																	<div className="text-sm text-left">
																		{
																			module.description
																		}
																	</div>
																	{!module.active && (
																		<div className="text-xxs text-left">
																			(Coming
																			soon)
																		</div>
																	)}
																</div>
															</button>
														)
													)}
												</>
											)}
										</div>

										{membershipModule &&
											membershipModule?.id ==
												MembershipType.ERC721 && (
												<div className="pt-8 w-full flex flex-col justify-start items-start space-y-4">
													<label className="pb-2 font-semibold">
														NFT Details
													</label>

													<div className="w-full flex flex-col items-start justify-start space-y-2">
														<label>Image</label>
														{nftImage ? (
															<div className="flex flex-col justify-center items-start space-y-2">
																<img
																	src={URL.createObjectURL(
																		nftImage
																	)}
																	className="max-w-[8rem] max-h-[8rem] bg-black rounded-3xl"
																/>
																<button
																	type="button"
																	onClick={() =>
																		setNftImage(
																			null
																		)
																	}
																	className="px-6 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base"
																>
																	Remove
																</button>
															</div>
														) : (
															<input
																type="file"
																name="nftImage"
																onChange={
																	onNftImageChange
																}
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
															value={nftName}
															onChange={(
																event: any
															) => {
																setNftName(
																	event.target
																		.value
																);
															}}
															placeholder="e.g. CityDAO Citizen"
														/>
													</div>

													<div className="w-full flex flex-col items-start justify-start space-y-2">
														<label>
															Description
														</label>

														<TextArea
															id="description"
															name="description"
															outerClassName="w-full"
															className="w-full bg-transparent text-white focus:outline-none"
															rows={6}
															value={
																nftDescription
															}
															onChange={(
																event: any
															) => {
																setNftDescription(
																	event.target
																		.value
																);
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
															value={nftQuantity}
															onChange={(
																event: any
															) => {
																setNftQuantity(
																	event.target
																		.value
																);
															}}
															placeholder="e.g. 10,000"
														/>
													</div>

													<div className="w-full flex flex-col items-start justify-start space-y-2">
														<label>Price</label>

														<Input
															id="name"
															name="name"
															type={"number"}
															outerClassName="w-64"
															className="w-full bg-transparent text-white focus:outline-none"
															value={nftPrice}
															onChange={(
																event: any
															) => {
																setNftPrice(
																	event.target
																		.value
																);
															}}
															placeholder="e.g. 0.5"
														/>
													</div>
												</div>
											)}
									</div>
								</>
							)}

							{currentStep == 4 && (
								<>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label className="pb-2 font-semibold">
											Select governance platform
										</label>

										<div className="w-full grid grid-cols-3 gap-4">
											{governancePlatform ? (
												<>
													<div
														className={getClassNames(
															"p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",

															"border-gray-700"
														)}
													>
														<div className="text-lg font-semibold text-left">
															{
																governancePlatform?.name
															}
														</div>
														<div className="text-sm text-left">
															{
																governancePlatform?.description
															}
														</div>
													</div>
													<button
														type="button"
														onClick={() =>
															setGovernancePlatform(
																null
															)
														}
														className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-700 hover:border-gray-500 rounded-3xl"
													>
														<div className="text-base font-semibold text-left">
															I changed my mind
														</div>
													</button>
												</>
											) : (
												<>
													{governanceModules.map(
														(module, index) => (
															<button
																key={index}
																type="button"
																onClick={() => {
																	if (
																		module.active
																	)
																		setGovernancePlatform(
																			module
																		);
																}}
																className={getClassNames(
																	"p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
																	module.active
																		? "border-gray-700 hover:border-gray-500"
																		: "border-gray-800"
																)}
															>
																<div
																	className={getClassNames(
																		module.active
																			? "text-white"
																			: "text-gray-500"
																	)}
																>
																	<div className="text-lg font-semibold text-left">
																		{
																			module.name
																		}
																	</div>
																	<div className="text-sm text-left">
																		{
																			module.description
																		}
																	</div>
																	{!module.active && (
																		<div className="text-xxs text-left">
																			(Coming
																			soon)
																		</div>
																	)}
																</div>
															</button>
														)
													)}
												</>
											)}
										</div>
									</div>

									{governancePlatform &&
										governancePlatform?.id ==
											GovernanceType.VOTE && (
											<>
												<div className="w-full flex flex-col items-start justify-start space-y-2">
													<label className="pb-2 font-semibold">
														Select governance module
													</label>

													<div className="w-full grid grid-cols-3 gap-4">
														{governanceModule ? (
															<>
																<div
																	className={getClassNames(
																		"p-4 h-42 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",

																		"border-gray-700"
																	)}
																>
																	<div className="text-lg font-semibold text-left">
																		{
																			governanceModule?.name
																		}
																	</div>
																	<div className="text-sm text-left">
																		{
																			governanceModule?.description
																		}
																	</div>
																</div>
																<button
																	type="button"
																	onClick={() =>
																		setGovernanceModule(
																			null
																		)
																	}
																	className="p-4 h-42 flex flex-col justify-center items-start text-gray-400 border border-gray-700 hover:border-gray-500 rounded-3xl"
																>
																	<div className="text-base font-semibold text-left">
																		I
																		changed
																		my mind
																	</div>
																</button>
															</>
														) : (
															<>
																{govBlocksGovernanceModules.map(
																	(
																		module,
																		index
																	) => (
																		<button
																			key={
																				index
																			}
																			type="button"
																			onClick={() => {
																				if (
																					module.active
																				)
																					setGovernanceModule(
																						module
																					);
																			}}
																			className={getClassNames(
																				"p-4 h-42 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
																				module.active
																					? "border-gray-700 hover:border-gray-500"
																					: "border-gray-800"
																			)}
																		>
																			<div
																				className={getClassNames(
																					module.active
																						? "text-white"
																						: "text-gray-500"
																				)}
																			>
																				<div className="text-lg font-semibold text-left">
																					{
																						module.name
																					}
																				</div>
																				<div className="text-sm text-left">
																					{
																						module.description
																					}
																				</div>
																				{!module.active && (
																					<div className="text-xxs text-left">
																						(Coming
																						soon)
																					</div>
																				)}
																			</div>
																		</button>
																	)
																)}
															</>
														)}
													</div>
												</div>

												{governanceModule && (
													<>
														<label className="pt-4 pb-2 font-semibold">
															GovBlock governance
															settings
														</label>
														<div className="w-full flex flex-col justify-center items-start space-y-4">
															<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
																<label>
																	Support
																</label>

																<div className="w-full flex flex-row justify-start items-center space-x-4">
																	<input
																		type="range"
																		min="0"
																		max="100"
																		value={
																			governanceThreshold
																		}
																		onChange={(
																			event
																		) => {
																			setGovernanceThreshold(
																				event
																					.target
																					.value
																			);
																		}}
																		className="w-1/2 range range-primary bg-gray-700"
																	/>
																	<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
																		<span className="font-semibold">
																			{
																				governanceThreshold
																			}
																		</span>{" "}
																		%
																	</div>
																</div>
															</div>

															<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
																<label>
																	Quorum
																</label>

																<div className="w-full flex flex-row justify-start items-center space-x-4">
																	<input
																		type="range"
																		min="0"
																		max={nftQuantity.toString()}
																		value={
																			governanceQuorum
																		}
																		onChange={(
																			event
																		) => {
																			setGovernanceQuorum(
																				event
																					.target
																					.value
																			);
																		}}
																		className="w-1/2 range range-primary bg-gray-700"
																	/>
																	<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
																		<span className="font-semibold">
																			{
																				governanceQuorum
																			}
																		</span>{" "}
																		votes
																	</div>
																</div>
															</div>

															<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
																<label>
																	Vote
																	Duration
																</label>

																<div className="w-full flex flex-row justify-start items-center space-x-4">
																	<input
																		type="range"
																		min="0"
																		max="14"
																		value={
																			governanceVoteDuration
																		}
																		onChange={(
																			event
																		) => {
																			setGovernanceVoteDuration(
																				event
																					.target
																					.value
																			);
																		}}
																		className="w-1/2 range range-primary bg-gray-700"
																	/>
																	<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
																		<span className="font-semibold">
																			{
																				governanceVoteDuration
																			}
																		</span>{" "}
																		days
																	</div>
																</div>
															</div>
														</div>
													</>
												)}

												{governanceModule &&
													governanceModule?.id ==
														GovernanceType.VOTEPARTICIPATION && (
														<>
															<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
																<label>
																	Voting
																	streak
																</label>

																<div className="w-full flex flex-row justify-start items-center space-x-4">
																	<input
																		type="range"
																		min="0"
																		max="10"
																		value={
																			governanceVoteStreak
																		}
																		onChange={(
																			event
																		) => {
																			setGovernanceVoteStreak(
																				event
																					.target
																					.value
																			);
																		}}
																		className="w-1/2 range range-primary bg-gray-700"
																	/>
																	<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
																		<span className="font-semibold">
																			{
																				governanceVoteStreak
																			}
																		</span>{" "}
																		proposals
																	</div>
																</div>
															</div>

															<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
																<label>
																	Voting
																	streak Vote
																	Multiplier
																</label>

																<div className="w-full flex flex-row justify-start items-center space-x-4">
																	<input
																		type="range"
																		min="1"
																		max="10"
																		value={
																			governanceVoteStreakMultiplier
																		}
																		onChange={(
																			event
																		) => {
																			setGovernanceVoteStreakMultiplier(
																				event
																					.target
																					.value
																			);
																		}}
																		className="w-1/2 range range-primary bg-gray-700"
																	/>
																	<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
																		<span className="font-semibold">
																			{
																				governanceVoteStreakMultiplier
																			}
																		</span>
																		x
																	</div>
																</div>
															</div>
														</>
													)}
											</>
										)}
								</>
							)}

							{currentStep > 1 && (
								<div className="w-full flex justify-between">
									<button
										type="button"
										onClick={() =>
											setCurrentStep(currentStep - 1)
										}
										className="mt-8 px-12 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base font-bold"
									>
										Back
									</button>

									<button
										type="button"
										onClick={() =>
											setCurrentStep(currentStep + 1)
										}
										className="mt-8 px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
									>
										Next
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		</Main>
	);
};

export default Index;
