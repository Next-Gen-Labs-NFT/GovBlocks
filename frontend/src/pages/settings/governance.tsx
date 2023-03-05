import Link from "next/link";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import { getClassNames } from "@/utils/classnames";

import {
	getVoteSupport,
	getQuorum,
	getProposalDuration,
	getVotingStreak,
	getVotingStreakMultiplier,
	getFacets,
	governanceModuleAddParticipation,
	governanceModuleRemoveParticipation,
	createProposalWithInstructions,
	getGovernanceCalldatas,
} from "@/utils/web3";

const Settings = () => {
	const { data: signer } = useSigner();

	const [existingGovernanceModule, setExistingGovernanceModule] =
		useState<any>(null);
	const [governanceModule, setGovernanceModule] = useState<any>(null);

	const [governanceThreshold, setGovernanceThreshold] = useState<any>(0);
	const [governanceQuorum, setGovernanceQuorum] = useState<any>(0);
	const [governanceVoteDuration, setGovernanceVoteDuration] =
		useState<any>(0);
	const [governanceVoteStreak, setGovernanceVoteStreak] = useState<any>(0);
	const [governanceVoteStreakMultiplier, setGovernanceVoteStreakMultiplier] =
		useState<any>(0);

	enum GovernanceType {
		VOTE,
		VOTEPARTICIPATION,
		CONSEQUENCES,
	}

	const governanceModules = [
		{
			id: GovernanceType.VOTE,
			name: "Standard",
			description: "Based on NFTs & Tokens",
			active: true,
		},
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
			active: false,
		},
	];

	useEffect(() => {
		const getInitialData = async () => {
			setGovernanceThreshold(await getVoteSupport());
			setGovernanceQuorum(await getQuorum());
			setGovernanceVoteDuration(await getProposalDuration());
			setGovernanceVoteStreak(await getVotingStreak());
			setGovernanceVoteStreakMultiplier(
				await getVotingStreakMultiplier()
			);

			const currentModule = governanceModules[await getFacets()];
			setGovernanceModule(currentModule);
			setExistingGovernanceModule(currentModule);
		};

		getInitialData();
	}, []);

	const updateGovernance = async () => {
		let calldatas: any[] = [];
		let description = `The following governance parameters will be updated:`;
		if (governanceModule) {
			if (existingGovernanceModule.id != governanceModule.id) {
				if (governanceModule.id == GovernanceType.VOTE) {
					const addCalldatas =
						await governanceModuleRemoveParticipation();
					calldatas = [...calldatas, ...addCalldatas];
				} else if (
					governanceModule.id == GovernanceType.VOTEPARTICIPATION
				) {
					const addCalldatas =
						await governanceModuleAddParticipation();
					calldatas = [...calldatas, ...addCalldatas];
				}

				description += `<br /><br />Module: ${governanceModule.name}<br />Description: ${governanceModule.description}`;
			}

			const convertedVoteDuration =
				governanceVoteDuration * 24 * 60 * 60 * 1000;

			const governanceCalldata = await getGovernanceCalldatas(
				governanceModule.id,
				governanceThreshold,
				governanceQuorum,
				convertedVoteDuration,
				governanceVoteStreak,
				governanceVoteStreakMultiplier
			);

			description += `<br /><br />Support: ${governanceThreshold}%<br />Quorum: ${governanceQuorum} votes<br />Vote Duration: ${governanceVoteDuration} days`;

			if (governanceModule.id == GovernanceType.VOTEPARTICIPATION) {
				description += `<br /><br />Voting streak: ${governanceVoteStreak} proposals<br />Voting
				streak
				Vote
				Multiplier: ${governanceVoteStreakMultiplier}x`;
			}

			calldatas = [...calldatas, ...governanceCalldata];

			console.log(description);
			console.log(calldatas);

			createProposalWithInstructions(
				signer,
				{
					name: "Governance update",
					description,
				},
				calldatas
			);
		}
	};

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Governance Settings
					</label>
					<Link
						href="/settings"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to settings
					</Link>
				</div>
				<div className="p-4 w-full flex flex-col justify-center items-start space-y-4 border border-gray-700 rounded-3xl">
					<label className="text-xl font-semibold">
						Standard Module
					</label>
					<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
						<label>Support</label>

						<div className="w-full flex flex-row justify-start items-center space-x-4">
							<input
								type="range"
								min="0"
								max="100"
								value={governanceThreshold}
								onChange={(event) => {
									setGovernanceThreshold(event.target.value);
								}}
								className="w-1/2 range range-primary bg-gray-700"
							/>
							<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
								<span className="font-semibold">
									{governanceThreshold}
								</span>{" "}
								%
							</div>
						</div>
					</div>

					<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
						<label>Quorum</label>

						<div className="w-full flex flex-row justify-start items-center space-x-4">
							<input
								type="range"
								min="0"
								max="10000"
								value={governanceQuorum}
								onChange={(event) => {
									setGovernanceQuorum(event.target.value);
								}}
								className="w-1/2 range range-primary bg-gray-700"
							/>
							<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
								<span className="font-semibold">
									{governanceQuorum}
								</span>{" "}
								votes
							</div>
						</div>
					</div>

					<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
						<label>Vote Duration</label>

						<div className="w-full flex flex-row justify-start items-center space-x-4">
							<input
								type="range"
								min="0"
								max="14"
								value={governanceVoteDuration}
								onChange={(event) => {
									setGovernanceVoteDuration(
										event.target.value
									);
								}}
								className="w-1/2 range range-primary bg-gray-700"
							/>
							<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
								<span className="font-semibold">
									{governanceVoteDuration}
								</span>{" "}
								days
							</div>
						</div>
					</div>
				</div>

				{governanceModule &&
					governanceModule.id == governanceModules[1].id && (
						<div className="mt-8 p-4 w-full flex flex-col justify-center items-start space-y-4 border border-gray-700 rounded-3xl">
							<div className="w-full flex flex-row justify-between items-start">
								<label className="text-xl font-semibold">
									Participation & Weighted Voting Module
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
								<label>Voting streak</label>

								<div className="w-full flex flex-row justify-start items-center space-x-4">
									<input
										type="range"
										min="0"
										max="10"
										value={governanceVoteStreak}
										onChange={(event) => {
											setGovernanceVoteStreak(
												event.target.value
											);
										}}
										className="w-1/2 range range-primary bg-gray-700"
									/>
									<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
										<span className="font-semibold">
											{governanceVoteStreak}
										</span>{" "}
										proposals
									</div>
								</div>
							</div>

							<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
								<label>Voting streak Vote Multiplier</label>

								<div className="w-full flex flex-row justify-start items-center space-x-4">
									<input
										type="range"
										min="1"
										max="10"
										value={governanceVoteStreakMultiplier}
										onChange={(event) => {
											setGovernanceVoteStreakMultiplier(
												event.target.value
											);
										}}
										className="w-1/2 range range-primary bg-gray-700"
									/>
									<div className="px-4 py-2 text-lg text-center border border-gray-700 rounded-full">
										<span className="font-semibold">
											{governanceVoteStreakMultiplier}
										</span>
										x
									</div>
								</div>
							</div>
						</div>
					)}

				<div className="pt-4 w-full flex flex-col justify-start items-start">
					{governanceModule &&
						governanceModule.id != governanceModules[1].id && (
							<>
								<div className="pb-2 text-lg font-semibold text-left">
									Optional Governance Modules
								</div>
								<button
									type="button"
									onClick={() => {
										setGovernanceModule(
											governanceModules[1]
										);
									}}
									className={getClassNames(
										"p-4 w-full h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
										"border-gray-700 hover:border-gray-500"
									)}
								>
									<div
										className={getClassNames("text-white")}
									>
										<div className="pt-2 pb-2 text-lg font-semibold text-left">
											{governanceModules[1].name}
										</div>
										<div className="text-sm text-left">
											{governanceModules[1].description}
										</div>
									</div>
								</button>
							</>
						)}
				</div>

				<div
					className={getClassNames(
						"mt-2 p-4 w-full h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
						"border-gray-700"
					)}
				>
					<div className={getClassNames("text-gray-500")}>
						<div className="pt-2 pb-2 text-lg font-semibold text-left">
							{governanceModules[2].name}
						</div>
						<div className="text-sm text-left">
							{governanceModules[2].description}
						</div>
						<div className="text-xs text-left">(Coming soon)</div>
					</div>
				</div>

				<div className="pt-8 w-full flex justify-end">
					<button
						type="button"
						onClick={updateGovernance}
						className="px-8 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
					>
						Propose Change
					</button>
				</div>
			</div>
		</DaoMain>
	);
};

export default Settings;
