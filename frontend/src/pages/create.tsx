import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Wallet } from "@/components/wallet";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { CreateDAOModal } from "@/components/modals/createdao";
import { getClassNames } from "@/utils/classnames";

const Index = () => {
	const { isConnected } = useAccount();

	const [currentStep, setCurrentStep] = useState<any>(0);
	const [showSubmitModal, setShowSubmitModal] = useState<any>(false);

	const [membershipModule, setMembershipModule] = useState<any>(null);
	const [governancePlatform, setGovernancePlatform] = useState<any>(null);
	const [governanceModule, setGovernanceModule] = useState<any>(null);

	const [name, setName] = useState<any>("");
	const [description, setDescription] = useState<any>("");
	const [url, setUrl] = useState<any>("");
	const [primaryColor, setPrimaryColor] = useState<any>("");
	const [logoFile, setLogoFile] = useState<any>(null);

	const [roles, setRoles] = useState<any>([]);
	const [roleName, setRoleName] = useState<any>("");
	const [walletRoles, setWalletRoles] = useState<any>([]);
	const [walletRoleName, setWalletRoleName] = useState<any>("");
	const [roleAddress, setRoleAddress] = useState<any>("");

	const [nftImage, setNftImage] = useState<any>(null);
	const [nftName, setNftName] = useState<any>("");
	const [nftDescription, setNftDescription] = useState<any>("");
	const [nftQuantity, setNftQuantity] = useState<any>(10000);
	const [nftPrice, setNftPrice] = useState<any>(0.1);

	const [governanceThreshold, setGovernanceThreshold] = useState<any>(51);
	const [governanceQuorum, setGovernanceQuorum] = useState<any>(2500);
	const [governanceVoteDuration, setGovernanceVoteDuration] =
		useState<any>(7);
	const [governanceVoteStreak, setGovernanceVoteStreak] = useState<any>(10);
	const [governanceVoteStreakMultiplier, setGovernanceVoteStreakMultiplier] =
		useState<any>(3);

	/*
	const [governanceNoVoteStreak, setGovernanceNoVoteStreakMultiplier] =
		useState<any>(0);
	const [
		governanceNoVoteStreakVotePenalty,
		setGovernanceNoVoteStreakVotePenalty,
	] = useState<any>(0);
	const [
		governanceNoVoteStreakMonetaryPenalty,
		setGovernanceNoVoteStreakMonetaryPenalty,
	] = useState<any>(0);
  */

	const [badgeName, setBadgeName] = useState<any>("");
	const [badgeThreshold, setBadgeThreshold] = useState<any>(10);
	const [badgeVoteMultiplier, setBadgeVoteMultiplier] = useState<any>(2);

	useEffect(() => {
		if (roles.length == 1) {
			setWalletRoleName(roles[0].name);
		}
	}, [roles]);

	const { data: signer } = useSigner();

	useEffect(() => {
		if (isConnected) {
			if (currentStep == 0) setCurrentStep(1);
		} else {
			setCurrentStep(0);
		}
	}, [isConnected, currentStep]);

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
			name: "The Basics",
		},
		{
			id: 2,
			name: "Roles",
		},
		{
			id: 3,
			name: "Token Details",
		},
		{
			id: 4,
			name: "Governance",
		},
		/*
		{
			id: 5,
			name: "Badges",
		},
		
		{
			id: 5,
			name: "Review",
		},
		*/
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
			name: "Subscriptions",
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
		CONSEQUENCES,
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
			id: GovernanceType.VOTEPARTICIPATION,
			name: "Participation & Weighted Voting",
			description:
				"Reward your best community members with amplified voting power based on how frequently they participate and vote on proposals",
			active: true,
		},
		{
			id: GovernanceType.CONSEQUENCES,
			name: "Consequencies",
			description:
				"Apply penalties to negligent governance token holders, similar to how the country of Australia mandates voting for their citizens",
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
										{currentStep >= step.id ? (
											<button
												type="button"
												onClick={() =>
													setCurrentStep(step.id)
												}
												className={getClassNames(
													"text-base",
													currentStep >= step.id
														? "text-white font-semibold"
														: "text-gray-700"
												)}
											>
												{step.name}
											</button>
										) : (
											<span
												className={getClassNames(
													"text-base text-white font-medium"
												)}
											>
												{step.name}
											</span>
										)}
									</li>
								))}
							</ol>
						</div>

						<div className="p-8 w-3/4 flex flex-col justify-start items-start space-y-4 border border-gray-700 rounded-3xl">
							{currentStep == 0 && (
								<div className="w-full flex flex-col items-start justify-start space-y-4">
									<div className="">
										Connect your wallet to get started
									</div>
									<Wallet bigView={false} />
									<div className="w-full flex justify-end">
										<button
											type="button"
											onClick={() =>
												setCurrentStep(currentStep + 1)
											}
											className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
										>
											Next
										</button>
									</div>
								</div>
							)}

							{currentStep == 1 && (
								<>
									<label className="pb-2 font-semibold">
										The Basics
									</label>
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

									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label>Url</label>
										<Input
											id="name"
											name="name"
											outerClassName="w-full"
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
												onClick={() =>
													setCurrentStep(
														currentStep + 1
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
									<label className="pb-2 font-semibold">
										Roles
									</label>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label>Role Name</label>
										<Input
											id="address"
											name="address"
											outerClassName="w-full"
											className="w-full bg-transparent text-white focus:outline-none"
											value={roleName}
											onChange={(event: any) => {
												setRoleName(event.target.value);
											}}
											placeholder="e.g. Super Admin or Guild Leader"
										/>
									</div>

									<button
										type="button"
										onClick={() => {
											setRoles([
												...roles,
												{
													name: roleName,
												},
											]);
											setRoleName("");
										}}
										className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
									>
										Create Role
									</button>

									{roles && roles.length > 0 && (
										<>
											<div className="pt-8 w-full flex flex-col items-start justify-start space-y-2">
												<label>Role</label>
												<select
													name="role"
													id="role"
													onChange={(event: any) => {
														setWalletRoleName(
															roles[
																event.target
																	.value
															].name
														);
													}}
													className="px-6 py-3 bg-transparent placeholder-gray-400 border border-gray-700 focus:outline-none focus:placeholder-gray-400 focus:ring-0 rounded-full"
												>
													{roles.map(
														(
															role: any,
															index: number
														) => (
															<option
																key={index}
																value={index}
															>
																{role.name}
															</option>
														)
													)}
												</select>
											</div>
											<div className="w-full flex flex-col items-start justify-start space-y-2">
												<label>Address</label>
												<Input
													id="address"
													name="address"
													outerClassName="w-full"
													className="w-full bg-transparent text-white focus:outline-none"
													value={roleAddress}
													onChange={(event: any) => {
														setRoleAddress(
															event.target.value
														);
													}}
												/>
											</div>

											<button
												type="button"
												onClick={() => {
													setWalletRoles([
														...walletRoles,
														{
															name: walletRoleName,
															address:
																roleAddress,
														},
													]);
													setRoleAddress("");
												}}
												className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
											>
												Assign Wallet Role
											</button>

											<div className="pt-8 flex flex-col justify-start items-start">
												<label className="pb-4">
													Assigned Roles
												</label>
												{walletRoles.map(
													(
														role: any,
														index: number
													) => (
														<div
															key={index}
															className="flex flex-row justify-start items-center space-x-4"
														>
															<div
																key={index}
																className="group py-1 flex flex-row justify-start items-center space-x-4"
															>
																<span>
																	{index + 1}.
																</span>
																<span>
																	{role.name}{" "}
																	-{" "}
																	{
																		role.address
																	}
																</span>
																<button
																	type="button"
																	onClick={() => {
																		const walletRoleToSplice =
																			[
																				...walletRoles,
																			];
																		walletRoleToSplice.splice(
																			index,
																			1
																		);
																		setWalletRoles(
																			walletRoleToSplice
																		);
																	}}
																>
																	<AiOutlineCloseCircle className="w-6 h-6 text-gray-400 group-hover:text-white" />
																</button>
															</div>
														</div>
													)
												)}
											</div>
										</>
									)}

									<div className="pt-8 w-full flex justify-between">
										<button
											type="button"
											onClick={() =>
												setCurrentStep(currentStep - 1)
											}
											className="px-12 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base font-bold"
										>
											Back
										</button>

										{walletRoles &&
										walletRoles.length > 0 ? (
											<button
												type="button"
												onClick={() =>
													setCurrentStep(
														currentStep + 1
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
												Add atleast one role to proceed
											</button>
										)}
									</div>
								</>
							)}

							{currentStep == 3 && (
								<>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label className="pb-2 font-semibold">
											Token Details
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
																	className="max-w-[16rem] max-h-[16rem] bg-black rounded-3xl"
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
														/>
													</div>

													<div className="flex flex-col justify-start items-start">
														<label className="pt-4 pb-2 font-semibold text-gray-500">
															Add More Tokens
															(Coming soon)
														</label>
														<div className="w-full grid grid-cols-4 gap-4">
															{membershipModules.map(
																(
																	module,
																	index
																) => (
																	<div
																		key={
																			index
																		}
																		className={getClassNames(
																			"p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",

																			"border-gray-800 cursor-default"
																		)}
																	>
																		<div
																			className={getClassNames(
																				"text-gray-500"
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
																	</div>
																)
															)}
														</div>
													</div>
												</div>
											)}
									</div>

									<div className="pt-8 w-full flex justify-between">
										<button
											type="button"
											onClick={() =>
												setCurrentStep(currentStep - 1)
											}
											className="px-12 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base font-bold"
										>
											Back
										</button>

										{nftImage &&
										nftName &&
										nftDescription &&
										nftQuantity &&
										nftPrice ? (
											<button
												type="button"
												onClick={() =>
													setCurrentStep(
														currentStep + 1
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

							{currentStep == 4 && (
								<>
									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label className="pb-2 font-semibold">
											Governance
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
																	setGovernanceModule(
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
												{governanceModule && (
													<>
														<div className="p-4 w-full flex flex-col justify-start items-start border border-gray-700 rounded-3xl">
															<label className="pb-2 font-semibold">
																Standard Module
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
														</div>

														{governanceModule?.id !=
															GovernanceType.VOTEPARTICIPATION && (
															<div className="pt-4 w-full flex flex-col justify-start items-start space-y-2">
																<div className="text-lg font-medium text-left">
																	Optional
																	Governance
																	Modules
																</div>

																<button
																	type="button"
																	onClick={() => {
																		setGovernanceModule(
																			govBlocksGovernanceModules[0]
																		);
																	}}
																	className={getClassNames(
																		"p-4 w-full h-32 flex flex-col justify-start items-start border border-gray-700 rounded-3xl",
																		"border-gray-700 hover:border-gray-500"
																	)}
																>
																	<div
																		className={getClassNames(
																			"text-white"
																		)}
																	>
																		<div className="pt-2 pb-2 text-lg font-semibold text-left">
																			{
																				govBlocksGovernanceModules[0]
																					.name
																			}
																		</div>
																		<div className="text-sm text-left">
																			{
																				govBlocksGovernanceModules[0]
																					.description
																			}
																		</div>
																	</div>
																</button>

																<div
																	className={getClassNames(
																		"p-4 w-full flex flex-col justify-start items-start border border-gray-700 rounded-3xl",
																		"border-gray-700"
																	)}
																>
																	<div
																		className={getClassNames(
																			"text-gray-500"
																		)}
																	>
																		<div className="pt-2 pb-2 text-lg font-semibold text-left">
																			{
																				govBlocksGovernanceModules[1]
																					.name
																			}
																		</div>
																		<div className="text-sm text-left">
																			{
																				govBlocksGovernanceModules[1]
																					.description
																			}
																		</div>
																		<div className="text-xs text-left">
																			(coming
																			soon)
																		</div>
																	</div>
																</div>
															</div>
														)}
													</>
												)}

												{governanceModule &&
													governanceModule?.id ==
														GovernanceType.VOTEPARTICIPATION && (
														<>
															<div className="p-4 w-full flex flex-col justify-start items-start border border-gray-700 rounded-3xl">
																<div className="w-full flex flex-row justify-between items-start">
																	<label className="font-semibold">
																		Participation
																		&
																		Weighted
																		Voting
																		Module
																	</label>
																	<button
																		type="button"
																		onClick={() =>
																			setGovernanceModule(
																				governanceModules[0]
																			)
																		}
																		className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
																	>
																		Remove
																	</button>
																</div>

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
																		streak
																		Vote
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
															</div>

															<div
																className={getClassNames(
																	"mt-4 p-4 w-full flex flex-col justify-start items-start border border-gray-700 rounded-3xl ",
																	"border-gray-700"
																)}
															>
																<div
																	className={getClassNames(
																		"text-gray-500"
																	)}
																>
																	<div className="pt-2 pb-2 text-lg font-semibold text-left">
																		{
																			govBlocksGovernanceModules[1]
																				.name
																		}
																	</div>
																	<div className="text-sm text-left">
																		{
																			govBlocksGovernanceModules[1]
																				.description
																		}
																	</div>
																	<div className="text-xs text-left">
																		(coming
																		soon)
																	</div>
																</div>
															</div>
														</>
													)}
											</>
										)}

									<div className="pt-8 w-full flex justify-between">
										<button
											type="button"
											onClick={() =>
												setCurrentStep(currentStep - 1)
											}
											className="px-12 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base font-bold"
										>
											Back
										</button>

										{governanceThreshold &&
										governanceQuorum &&
										governanceVoteDuration ? (
											<button
												type="button"
												onClick={() =>
													setShowSubmitModal(true)
												}
												className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
											>
												Create DAO
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

							{/* 
							currentStep == 5 && (
								<>
									<label className="pb-2 font-semibold">
										Badges
									</label>

									<div className="w-full flex flex-col items-start justify-start space-y-2">
										<label>Badge Type Name</label>

										<Input
											id="name"
											name="name"
											outerClassName="w-full"
											className="w-full bg-transparent text-white focus:outline-none"
											value={badgeName}
											onChange={(event: any) => {
												setBadgeName(
													event.target.value
												);
											}}
											placeholder="e.g. Townhall"
										/>

										<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
											<label>Badge Threshold</label>

											<div className="w-full flex flex-row justify-start items-center space-x-4">
												<input
													type="range"
													min="0"
													max="25"
													value={badgeThreshold}
													onChange={(event) => {
														setBadgeThreshold(
															event.target.value
														);
													}}
													className="w-1/2 range range-primary bg-gray-700"
												/>
												<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
													<span className="font-semibold">
														{badgeThreshold}
													</span>{" "}
													badges
												</div>
											</div>
										</div>

										<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
											<label>Vote Multiplier</label>

											<div className="w-full flex flex-row justify-start items-center space-x-4">
												<input
													type="range"
													min="0"
													max="14"
													value={badgeVoteMultiplier}
													onChange={(event) => {
														setBadgeVoteMultiplier(
															event.target.value
														);
													}}
													className="w-1/2 range range-primary bg-gray-700"
												/>
												<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
													<span className="font-semibold">
														{badgeVoteMultiplier}
													</span>{" "}
													x
												</div>
											</div>
										</div>
									</div>
								</>
							) 
							*/}
						</div>
					</div>
				</div>

				<CreateDAOModal
					open={showSubmitModal}
					onClose={() => setShowSubmitModal(false)}
				/>
			</>
		</Main>
	);
};

export default Index;
