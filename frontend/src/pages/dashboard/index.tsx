import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { useAccount, useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	getGasTokenSymbol,
	getIPFSJSONData,
	getMembershipMaxSupply,
	getMembershipMintPrice,
	getMembershipNFTImage,
	getMembershipTotalSupply,
	getProposalCount,
	getProposals,
	getUserVotingStreak,
	mintMembership,
	getMembershipNFTs,
} from "@/utils/web3";

const Dashboard = () => {
	const { data: signer } = useSigner();
	const { address } = useAccount();

	const [membershipNftImage, setMembershipNftImage] = useState<any>(null);
	const [membershipMintPrice, setMembershipMintPrice] = useState<any>(0);
	const [membershipMaxSupply, setMembershipMaxSupply] = useState<any>(0);
	const [membershipTotalSupply, setMembershipTotalSupply] = useState<any>(0);
	const [membershipsOwned, setMembershipsOwned] = useState<any>(0);

	const [proposalCount, setProposalCount] = useState<any>(0);
	const [proposals, setProposals] = useState<any>(null);
	const [proposalsMetadata, setProposalsMetadata] = useState<any>(null);
	const [votingStreak, setUserVotingStreak] = useState<any>(0);

	useEffect(() => {
		const getInitialData = async () => {
			setMembershipNftImage(await getMembershipNFTImage());
			setMembershipMintPrice(await getMembershipMintPrice());
			setMembershipMaxSupply(await getMembershipMaxSupply());
			setMembershipTotalSupply(await getMembershipTotalSupply());
			setMembershipsOwned(await getMembershipNFTs(address));
			setUserVotingStreak(await getUserVotingStreak(address));

			const newProposalCount = await getProposalCount();
			setProposalCount(newProposalCount);
		};

		getInitialData();
	}, []);

	useEffect(() => {
		const getInitialData = async () => {
			const newProposals = await getProposals(proposalCount);
			console.log(newProposals);
			for (let i = 0; i < newProposals.length; i++) {
				const metadata = await getIPFSJSONData(newProposals[i][2]);
				newProposals[i] = [...newProposals[i], metadata];
			}

			setProposals(newProposals);
		};

		getInitialData();
	}, [proposalCount]);

	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="py-2 w-full">
					<label className="py-4 text-xl font-semibold">
						Membership
					</label>
					<div className="flex flex-row justify-between items-center">
						<div className="relative mt-2 p-4 w-fit h-full flex flex-row justify-start items-start space-x-4 border border-gray-700 rounded-3xl">
							<div>
								{membershipNftImage && (
									<img
										src={membershipNftImage}
										className="max-w-[12rem] max-h-[12rem] rounded-2xl"
									/>
								)}
							</div>
							<div className="w-[12rem] h-[12rem] flex flex-col justify-center items-center">
								<div className="">
									<span className="text-sm">Price</span>
								</div>
								<div className="">
									<span className="text-3xl">
										{membershipMintPrice}
									</span>{" "}
									{getGasTokenSymbol()}
								</div>
								<div className="py-4">
									<span className="text-3xl">
										{membershipTotalSupply}
									</span>
									/{membershipMaxSupply} minted
								</div>
								<button
									type="button"
									onClick={() => {
										mintMembership(signer, address);
									}}
									className="px-6 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
								>
									Mint Membership
								</button>
							</div>
						</div>
						<div className="relative mt-2 p-4 w-fit h-full flex flex-row justify-start items-start space-x-4 border border-gray-700 rounded-3xl">
							<div className="w-[12rem] h-[12rem] flex flex-col justify-center items-center">
								<div className="">
									<span className="text-sm">You own</span>
								</div>
								<div className="flex flex-col items-center">
									<span className="text-3xl">
										{membershipsOwned}
									</span>{" "}
									Membership NFTs
								</div>
								<div className="py-4 flex flex-col items-center">
									<span className="text-3xl">
										{votingStreak}
									</span>
									Voting Power
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-6 pb-2 w-full">
					<label className="pt-4 pb-2 text-xl font-semibold">
						Proposals ({proposalCount})
					</label>
				</div>
				<div className="py-2 w-full grid grid-cols-4 gap-4">
					{membershipsOwned > 0 && (
						<Link
							href="/dashboard/proposals/create"
							className="p-4 min-h-[14rem] flex flex-col justify-center items-center space-y-2 border border-gray-700 hover:border-gray-500 rounded-3xl"
						>
							<div className="">
								<BsPlusCircle className="w-8 h-8" />
							</div>
							<div className="font-medium text-lg text-left">
								Create Proposal
							</div>
						</Link>
					)}
					{proposals &&
						proposals.map((proposal: any, index: number) => (
							<Link
								key={index}
								href={`/dashboard/proposals/${proposal[0].toNumber()}`}
								className="p-4 min-h-[14rem] flex flex-col justify-start items-start border border-gray-700 hover:border-gray-500 rounded-3xl"
							>
								<div className="font-semibold text-left">
									{proposal[12].name}
								</div>
								<div
									className="pt-4 text-sm text-left overflow-hidden line-clamp-6"
									dangerouslySetInnerHTML={{
										__html: proposal[12].description,
									}}
								></div>
							</Link>
						))}
				</div>
				<div className="pt-6 pb-2 w-full">
					<label className="pt-4 pb-2 text-xl font-semibold">
						Custom Badges ({proposalCount})
					</label>
				</div>
				<div className="py-2 min-h-[14rem] w-full grid grid-cols-4 gap-4">
					<Link
						href="/dashboard/proposals/create"
						className="group p-4 flex flex-col justify-center items-center space-y-2 border border-gray-700 hover:border-gray-500 rounded-3xl"
					>
						<div className="">
							<BsPlusCircle className="w-8 h-8" />
						</div>
						<div className="font-medium text-lg text-left">
							Create Custom Badge
						</div>
					</Link>
					{proposals &&
						proposals.map((proposal: any, index: number) => (
							<Link
								key={index}
								href={`/dashboard/proposals/${proposal[0].toNumber()}`}
								className="p-4 flex flex-col justify-start items-start border border-gray-700 hover:border-gray-500 rounded-3xl"
							>
								<div className="font-semibold text-left">
									{proposal[12].name}
								</div>
								<div className="pt-4 text-sm text-left overflow-hidden line-clamp-6">
									{proposal[12].description}
								</div>
							</Link>
						))}
				</div>
			</div>
		</DaoMain>
	);
};

export default Dashboard;
