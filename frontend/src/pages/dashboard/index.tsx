import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { BsPlus } from "react-icons/bs";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";
import { getIPFSJSONData, getProposalCount, getProposals } from "@/utils/web3";

const Dashboard = () => {
	const [proposalCount, setProposalCount] = useState(0);
	const [proposals, setProposals] = useState(null);
	const [proposalsMetadata, setProposalsMetadata] = useState(null);

	useEffect(() => {
		const getInitialData = async () => {
			const newProposalCount = await getProposalCount();
			setProposalCount(newProposalCount);
		};

		getInitialData();
	}, []);

	useEffect(() => {
		const getInitialData = async () => {
			let newProposals = await getProposals(proposalCount);

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
					<label className="pt-4 pb-2 text-xl font-semibold">
						Proposals ({proposalCount})
					</label>
				</div>
				<div className="py-2 w-full grid grid-cols-4 gap-4">
					{proposals &&
						proposals.map((proposal, index) => (
							<button
								type="button"
								className="p-4 border border-gray-700 hover:border-gray-500 rounded-3xl"
							>
								<div className="font-semibold text-left">
									{proposal[12].name}
								</div>
								<div className="pt-4 text-sm text-left overflow-hidden line-clamp-6">
									{proposal[12].description}
								</div>
							</button>
						))}
				</div>
			</div>
		</DaoMain>
	);
};

export default Dashboard;
