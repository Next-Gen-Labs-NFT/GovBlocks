import { useState } from "react";
import Link from "next/link";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";

import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";

const Settings = () => {
	const [governanceThreshold, setGovernanceThreshold] = useState(0);
	const [governanceQuorum, setGovernanceQuorum] = useState(0);
	const [governanceVoteDuration, setGovernanceVoteDuration] = useState(0);
	const [governanceVoteStreak, setGovernanceVoteStreak] = useState(0);
	const [governanceVoteStreakMultiplier, setGovernanceVoteStreakMultiplier] =
		useState(0);

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Governance Module
					</label>
					<Link
						href="/settings"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to settings
					</Link>
				</div>
				<div className="py-2 w-full flex flex-col justify-center items-start space-y-4">
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
					<div className="py-2 w-full flex flex-col items-start justify-start space-y-1">
						<label>Voting streak</label>

						<div className="w-full flex flex-row justify-start items-center space-x-4">
							<input
								type="range"
								min="0"
								max="10"
								value={governanceVoteStreak}
								onChange={(event) => {
									setGovernanceVoteStreak(event.target.value);
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
			</div>
		</DaoMain>
	);
};

export default Settings;
