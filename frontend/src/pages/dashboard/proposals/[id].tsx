import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	castVote,
	endVotingTest,
	executeProposal,
	getIPFSJSONData,
	getProposal,
	getVoteCount,
	isVotingFinalized,
} from "@/utils/web3";

const Proposal = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: signer } = useSigner();

	const [proposal, setProposal] = useState<any>(null);
	const [voteCount, setVoteCount] = useState<any>(0);
	const [votingFinalized, setVotingFinalized] = useState<any>(false);

	useEffect(() => {
		const getInitialData = async () => {
			if (id) {
				let newProposal = await getProposal(parseInt(id as string));

				if (newProposal) {
					const metadata = await getIPFSJSONData(newProposal[2]);
					newProposal = [...newProposal, metadata];
				}

				setProposal(newProposal);
			}
		};

		getInitialData();
	}, [id]);

	useEffect(() => {
		const getInitialData = async () => {
			if (id) {
				setVoteCount(await getVoteCount(parseInt(id as string)));
				setVotingFinalized(
					await isVotingFinalized(parseInt(id as string))
				);
			}
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
					<div className="py-2 w-full flex flex-row justify-between items-start">
						<div className="py-2 w-2/3 flex flex-col justify-start items-start">
							<div className="font-semibold text-3xl text-left">
								{proposal[12].name}
							</div>
							<div
								className="pt-4 text-lg m text-left overflow-hidden"
								dangerouslySetInnerHTML={{
									__html: proposal[12].description,
								}}
							></div>

							{votingFinalized ? (
								<div className="pt-4 flex flex-col justify-start items-start space-y-4">
									<div className="pt-12 text-lg m text-left overflow-hidden">
										Voting has concluded. You can execute
										the proposal below.
									</div>
									<button
										type="button"
										onClick={() => {
											executeProposal(
												signer,
												parseInt(id as string)
											);
										}}
										className="px-6 py-2 flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-full"
									>
										Execute Proposal
									</button>
								</div>
							) : (
								<>
									<div className="pt-12 text-lg m text-left overflow-hidden line-clamp-6">
										How would you like to vote?
									</div>
									<div className="pt-4 flex flex-row justify-start items-start space-x-4">
										<button
											type="button"
											onClick={() => {
												castVote(
													signer,
													parseInt(id as string),
													0
												);
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
									<div className="pt-24 text-lg m text-left overflow-hidden line-clamp-6">
										THIS SECTION IS FOR TESTING ONLY
									</div>
									<div className="pt-4 flex flex-row justify-start items-start space-x-4">
										<button
											type="button"
											onClick={() => {
												endVotingTest(
													signer,
													parseInt(id as string)
												);
											}}
											className="px-6 py-2 flex justify-center items-center bg-gray-600 hover:bg-gray-700 rounded-full"
										>
											End Voting
										</button>
									</div>
								</>
							)}
						</div>
						{proposal && (
							<div className="py-2 w-1/3 flex flex-col justify-start items-end">
								<div className="p-4 w-full border border-gray-700 font-normal rounded-3xl">
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>Total votes</span>
										<span className="font-semibold text-2xl">
											{voteCount}
										</span>
									</div>
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>Yes votes</span>
										<span className="font-semibold text-2xl">
											{proposal[7].toNumber()}
										</span>
									</div>
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>No votes</span>
										<span className="font-semibold text-2xl">
											{proposal[8].toNumber()}
										</span>
									</div>
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>Abstain votes</span>
										<span className="font-semibold text-2xl">
											{proposal[9].toNumber()}
										</span>
									</div>
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>Quorum</span>
										<span className="font-semibold text-2xl">
											{proposal[5].toNumber()} votes
										</span>
									</div>
									<div className="w-full flex flex-row justify-start items-center space-x-4 text-lg text-left">
										<span>Support</span>
										<span className="font-semibold text-2xl">
											{proposal[6].toNumber()}%
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</DaoMain>
	);
};

export default Proposal;
