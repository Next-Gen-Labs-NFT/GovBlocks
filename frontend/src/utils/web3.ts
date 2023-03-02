import Web3 from "web3";
import { ethers } from "ethers";

import { getContracts } from "@/utils/contracts";
const contracts = getContracts("mumbai");

const web3Rpc = new Web3(new Web3.providers.HttpProvider(contracts.rpcUrl));

const setBrandUri = async (address: string, signer: any, uri: string) => {
  //const web3 = new Web3(provider);
  //console.log(web3Rpc);
  /*
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    signer
  );

 
  const brand = new web3.eth.Contract(
    contracts.brandFacetAbi,
    contracts.diamondAddress,
    { from: address }
  );
 

  console.log(await brand.getBrandUri());

  const ownership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.ownershipFacetAbi,
    signer
  );

  console.log(await ownership.owner());
 */
  /*
  const transaction = await ownership.transferOwnership(
    contracts.diamondAddress
  );
  console.log(transaction);
  */

  console.log("Diamond Address: " + contracts.diamondAddress);
  const membership = new ethers.Contract(
    "0xCD5Cc986Fe03a0b47EefeDA997F40673367f4AfF",
    contracts.membershipContractAbi,
    signer
  );

  const transaction = await membership.safeMint(address);
  console.log(transaction);

  /*
  console.log("Address: " + address);

  const options = { value: ethers.utils.parseEther("0.01") };
  const transaction = await membership.mint(
    "0xCD5Cc986Fe03a0b47EefeDA997F40673367f4AfF",
    address,
    options
  );
  console.log(transaction);
  */
};

export { setBrandUri };
