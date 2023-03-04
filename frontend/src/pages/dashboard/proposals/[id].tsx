import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { BsPlus } from "react-icons/bs";

import { useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";

import {
	getIPFSJSONData,
	getProposal,
	castVote,
	endVotingTest,
	getVoteCount,
	executeProposal,
} from "@/utils/web3";

const Proposal = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: signer } = useSigner();

	const [proposal, setProposal] = useState(null);
	const [voteCount, setVoteCount] = useState(0);

	useEffect(() => {
		const getInitialData = async () => {
			let newProposal = await getProposal(id);

			const metadata = await getIPFSJSONData(newProposal[2]);
			newProposal = [...newProposal, metadata];

			setProposal(newProposal);
		};

		getInitialData();
	}, []);

	useEffect(() => {
		const getInitialData = async () => {
			setVoteCount(await getVoteCount(id));
		};

		getInitialData();
	});

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="pt-6 pb-4 w-full flex flex-row justify-between items-center">
					<label className="text-xl font-semibold">
						Proposal Details
					</label>
					<Link
						href="/dashboard"
						className="px-6 py-2 flex justify-center items-center border border-gray-700 hover:border-gray-400 rounded-full"
					>
						Back to dashboard
					</Link>
				</div>
				{proposal && (
					<div className="py-2 w-full flex flex-row justify-center items-start">
						<div className="py-2 w-full flex flex-col justify-start items-start">
							<div className="font-semibold text-3xl text-left">
								{proposal[12].name}
							</div>
							<div
								className="pt-4 text-lg m text-left overflow-hidden line-clamp-6"
								dangerouslySetInnerHTML={{
									__html: proposal[12].description,
								}}
							></div>
							<div className="pt-12 text-lg m text-left overflow-hidden line-clamp-6">
								How would you like to vote?
							</div>
							<div className="pt-4 flex flex-row justify-start items-start space-x-4">
								<button
									type="button"
									onClick={() => {
										castVote(signer, id, 0);
									}}
									className="px-6 py-2 flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-full"
								>
									Yes
								</button>
								<button
									type="button"
									className="px-6 py-2 flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full"
								>
									No
								</button>
								<button
									type="button"
									className="px-6 py-2 flex justify-center items-center bg-gray-600 hover:bg-gray-700 rounded-full"
								>
									Abstain
								</button>
							</div>

							<div className="pt-4 flex flex-row justify-start items-start space-x-4">
								<button
									type="button"
									onClick={() => {
										executeProposal(signer, id);
									}}
									className="px-6 py-2 flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-full"
								>
									Execute Proposal
								</button>
							</div>

							<div className="pt-12 text-lg m text-left overflow-hidden line-clamp-6">
								THIS SECTION IS FOR TESTING ONLY
							</div>
							<div className="pt-4 flex flex-row justify-start items-start space-x-4">
								<button
									type="button"
									onClick={() => {
										endVotingTest(signer, id);
									}}
									className="px-6 py-2 flex justify-center items-center bg-gray-600 hover:bg-gray-700 rounded-full"
								>
									End Voting
								</button>
							</div>
						</div>
						<div className="py-2 w-full flex flex-col justify-start items-start">
							<div className="font-semibold text-3xl text-left">
								Votes Casted {voteCount}
							</div>
						</div>
					</div>
				)}
			</div>
		</DaoMain>
	);
};

export default Proposal;
