import Link from "next/link";
import { BsPlus } from "react-icons/bs";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
	return (
		<Main meta={<Meta title="" description="" />}>
			<div className="mx-auto max-w-screen-md flex flex-col justify-start items-center grow">
				<div className="flex flex-col justify-center items-center">
					<h2 className="text-4xl font-semibold">Welcome</h2>
					<p className="pt-6 text-2xl">
						The DAO Governance Platform that{" "}
						<span className="underline">
							evolves with your community
						</span>
					</p>
				</div>

				<Link
					href="/create"
					className="my-16 px-16 py-8 flex items-center space-x-2 text-white bg-primary hover:bg-primary-600 rounded-full text-2xl"
				>
					<BsPlus className="w-8 h-8" />
					<span>Create a Community</span>
				</Link>

				<div className="flex flex-col justify-center items-center">
					<p className="text-xl">
						We help DAOs{" "}
						<span className="text-2xl underline">
							govern better,
						</span>{" "}
						so they can{" "}
						<span className="underline">build more</span>
					</p>
				</div>
			</div>
		</Main>
	);
};

export default Index;
