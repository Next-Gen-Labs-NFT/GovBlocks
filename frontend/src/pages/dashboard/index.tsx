import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { BsPlusCircle } from "react-icons/bs";

import { useSigner, useAccount } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import {
	getIPFSJSONData,
	getProposalCount,
	getProposals,
	getMembershipNFTImage,
	getMembershipMintPrice,
	getMembershipMaxSupply,
	getMembershipTotalSupply,
	mintMembership,
} from "@/utils/web3";

const Dashboard = () => {
	const { data: signer } = useSigner();
	const { address } = useAccount();

	const [membershipNftImage, setMembershipNftImage] = useState(null);
	const [membershipMintPrice, setMembershipMintPrice] = useState(0);
	const [membershipMaxSupply, setMembershipMaxSupply] = useState(0);
	const [membershipTotalSupply, setMembershipTotalSupply] = useState(0);

	const [proposalCount, setProposalCount] = useState(0);
	const [proposals, setProposals] = useState(null);
	const [proposalsMetadata, setProposalsMetadata] = useState(null);

	useEffect(() => {
		const getInitialData = async () => {
			setMembershipNftImage(await getMembershipNFTImage());
			setMembershipMintPrice(await getMembershipMintPrice());
			setMembershipMaxSupply(await getMembershipMaxSupply());
			setMembershipTotalSupply(await getMembershipTotalSupply());

			const newProposalCount = await getProposalCount();
			setProposalCount(newProposalCount);
		};

		getInitialData();
	}, []);

	useEffect(() => {
		const getInitialData = async () => {
			let newProposals = await getProposals(proposalCount);
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
								ETH
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
				</div>
				<div className="pt-6 pb-2 w-full">
					<label className="pt-4 pb-2 text-xl font-semibold">
						Proposals ({proposalCount})
					</label>
				</div>
				<div className="py-2 min-h-[14rem] w-full grid grid-cols-4 gap-4">
					<Link
						href="/dashboard/proposals/create"
						className="p-4 flex flex-col justify-center items-center space-y-2 border border-gray-700 hover:border-gray-500 rounded-3xl"
					>
						<div className="">
							<BsPlusCircle className="w-8 h-8" />
						</div>
						<div className="font-medium text-lg text-left">
							Create Proposal
						</div>
					</Link>
					{proposals &&
						proposals.map((proposal, index) => (
							<Link
								href={
									"/dashboard/proposals/" +
									proposal[0].toNumber()
								}
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
						proposals.map((proposal, index) => (
							<Link
								href={
									"/dashboard/proposals/" +
									proposal[0].toNumber()
								}
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
