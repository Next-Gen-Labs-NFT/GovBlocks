import Web3 from "web3";
import { ethers } from "ethers";

import { getContracts } from "@/utils/contracts";
import brandFacetAbi from './abi/BrandFacet.json';

const contracts = getContracts("mumbai");

const web3Rpc = new Web3(new Web3.providers.HttpProvider(contracts.rpcUrl));

const setBrandUri = async (address: string, signer: any, uri: string) => {

  // const brand = new ethers.Contract(
  //   contracts.diamondAddress,
  //   contracts.brandFacetAbi,
  //   signer
  // );
  // const name = await brand.getBrandName();
  // console.log('name', name);
  //const web3 = new Web3(provider);
  //console.log(web3Rpc);
  /*
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    signer
  );
  console.log(await brand.getBrandURI());
  // const brand = new ethers.Contract(
  //   contracts.diamondAddress,
  //   contracts.brandFacetAbi,
  //   signer
  // );
  // const name = await brand.getBrandName();
  // console.log('name', name);
  //const web3 = new Web3(provider);
  //console.log(web3Rpc);
  /*
 

 
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
  console.log('ABI', brandFacetAbi);
  let iface = new ethers.utils.Interface(brandFacetAbi);
  const callData = [iface.encodeFunctionData("setBrandName", ['foobar'])]
  console.log('callData', callData);
  let transaction;
  // const membership = new ethers.Contract(
  //   contracts.diamondAddress,
  //   contracts.membershipFacetAbi,
  //   signer
  // );
  // console.log('membership', membership);


  // const options = { value: ethers.utils.parseEther("0.01") };

  // transaction = await membership.mint(
  //   "0x23059d4308bc7EfD9c04646ca4B9f28E2B7fB530",
  //   address,
  //   options
  // );

  const govFacetA = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  // transaction = await govFacetA.propose(
  //   [contracts.diamondAddress],
  //   [0],
  //   ["foo"],
  //   callData,
  //   "https://www.foo.bar"
  // );

  // transaction = await govFacetA.castVote(
  //   4,
  //   0
  // );
  // console.log('castVote', transaction);
  // transaction = await govFacetA.getForVotes(4);
  // console.log('forvotes', transaction);

  // transaction = await govFacetA.getRequiredVotes(
  //   2
  // );
  // console.log('forvotes', transaction);

  // transaction = await govFacetA.getVoteCount('0x23059d4308bc7EfD9c04646ca4B9f28E2B7fB530');
  // console.log('voteCount', transaction);


  // transaction = await govFacetA.getProposalCount();
  // console.log('proposalCount', transaction);

  transaction = await govFacetA.execute(4);
  console.log('execute tx', transaction);




  // console.log(transaction);



  // transaction = await govFacetA.endVotingTest(4);
  // console.log('endvote', transaction);


  // transaction = await govFacetA.getVoteSupport(1);
  // console.log('execute', transaction);

};

export { setBrandUri };
