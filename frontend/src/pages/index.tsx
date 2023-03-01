import Link from "next/link";

import { BsPlus } from "react-icons/bs";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  return (
    <Main
      meta={<Meta title="ETHDenver 2023 Buidlathon Bounties" description="" />}
    >
      <div className="mx-auto max-w-screen-md flex flex-col justify-start items-center grow">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl">Welcome</h2>
          <p className="text-xl">
            Build your DAO that evolves with your community
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
            Don't be a DAO that won't be around in a year.
          </p>

          <p className="mt-8 p-8 text-base text-center border border-gray-700 rounded-3xl">
            Not sure how to setup your DAO? Learn more in the documentation or
            join GovBlocks Discord.
          </p>
        </div>
      </div>
    </Main>
  );
};

export default Index;
