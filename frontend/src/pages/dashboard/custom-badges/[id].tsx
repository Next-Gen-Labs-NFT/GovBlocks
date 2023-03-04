import Link from "next/link";

import { BsPlus } from "react-icons/bs";

import { Meta } from "@/layouts/Meta";
import { DaoMain } from "@/templates/DaoMain";

const Dashboard = () => {
	return (
		<DaoMain meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
				<div className="py-2 w-full">
					<label className="pt-4 pb-2 text-xl font-semibold">
						Active Proposals
					</label>
				</div>
				<div className="py-2 w-full grid grid-cols-4 gap-4">
					<button
						type="button"
						className="p-4 border border-gray-700 hover:border-gray-500 rounded-3xl"
					>
						<div className="font-semibold text-left">
							CityDAO @ ETHDenver 23’
						</div>
						<div className="pt-4 text-sm text-left overflow-hidden line-clamp-6">
							Hey everyone, ETHDenver is rapidly approaching, and
							unfortunately, the most recent ETHDenver
							event-related CIP did not reach the quorum:
							https://forum.citydao.io/t/cip-131-fund-irl-events-citydao-winter-meetup-and-ethdenver/1874/20
							We have had 60+ Citizens fill out the following
							form: https://kl6nnf5yfbj.typeform.com/to/EDDMHk8F
							This CIP is to do the following: Sponsor Housing for
							CityDAO Citizens wanting to build projects at
							ETHDenver. Sponsor some CityDAO Merch for these
							teams to represent CityDAO at the event. Sponsor
							small networking events through the wider event
							Provide Resources to Citizens to form teams & ideas
						</div>
					</button>
				</div>
			</div>
		</DaoMain>
	);
};

export default Dashboard;
