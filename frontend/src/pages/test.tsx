/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prettier/prettier */
/* eslint-disable radix */

import { useState } from "react";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import { setBrandUri } from "@/utils/web3";

import { useSigner, useAccount } from "wagmi";

const Index = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  return (
    <Main
      meta={<Meta title="ETHDenver 2023 Buidlathon Bounties" description="" />}
    >
      <div>
        <button
          onClick={() => {
            setBrandUri(address, signer, "https://test1");
          }}
        >
          Set Brand URI
        </button>
      </div>
    </Main>
  );
};

export default Index;
