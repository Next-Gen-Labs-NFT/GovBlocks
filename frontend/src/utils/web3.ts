import Web3 from "web3";
import { ethers } from "ethers";

import { getContracts } from "@/utils/contracts";
const contracts = getContracts("mumbai");

const web3Rpc = new Web3(new Web3.providers.HttpProvider(contracts.rpcUrl));

const setBrandUri = async (signer: any, uri: string) => {
  //const web3 = new Web3(provider);
  //console.log(web3Rpc);

  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    signer
  );

  /*
  const brand = new web3.eth.Contract(
    contracts.brandFacetAbi,
    contracts.diamondAddress,
    { from: address }
  );
  */

  console.log(await brand.getBrandUri());

  const ownership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.ownershipFacetAbi,
    signer
  );

  console.log(await ownership.owner());

  /*
  const transaction = await ownership.transferOwnership(
    contracts.diamondAddress
  );
  console.log(transaction);
  */
};

export { setBrandUri };
