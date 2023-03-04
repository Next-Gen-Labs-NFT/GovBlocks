import { ethers, providers } from "ethers";

import { getContracts } from "@/utils/contracts";

import { uploadContent } from "./ipfs";

const contracts = getContracts("mumbai");
const ethersProvider = new ethers.providers.JsonRpcProvider(contracts.rpcUrl);

const getNftStorageURI = (ipfsURI: string) => {
  let nftStorageURI = "";
  if (ipfsURI && ipfsURI.includes("ipfs://")) {
    const updatedIPFSURI = ipfsURI.replace(/^ipfs?:\/\//, "");
    nftStorageURI = `https://nftstorage.link/ipfs/${updatedIPFSURI}`;
  }
  return nftStorageURI;
};

const getIPFSJSONData = async (ipfsURI: string) => {
  const nftStorageURI = getNftStorageURI(ipfsURI);
  const ipfsData = await fetch(nftStorageURI);
  const jsonData = await ipfsData.json();
  return jsonData;
};

const setBrandUri = async (address: string, signer: any, uri: string) => {
  // const brand = new ethers.Contract(
  //   contracts.diamondAddress,
  //   contracts.brandFacetAbi,
  //   signer
  // );
  // const name = await brand.getBrandName();
  // console.log('name', name);
  // const web3 = new Web3(provider);
  // console.log(web3Rpc);
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
  // console.log("Diamond Address: " + contracts.diamondAddress);
  const govFacetA = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  // const transaction = await membership.safeMint(address);
  // console.log(transaction);

  console.log(`Address: ${address}`);

  // const options = { value: ethers.utils.parseEther("0.01") };
  // const transaction = await membership.mint(
  //   "0xF9ce5E163DcA174851a06c79f19262EEd3356fdD",
  //   address,
  //   options
  // );
  // console.log(transaction);

  // const options = {};
  // const transaction = await membership.propose(
  //   [],
  //   [],
  //   [],
  //   [],
  //   'https://www.foo.bar'
  // );

  // const transaction = await govFacetA.castVote(1, 1);
  // console.log(transaction);

  // console.log("Diamond Address: " + contracts.diamondAddress);
  const membership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  // const transaction = await membership.safeMint(address);
  // console.log(transaction);

  console.log(`Address: ${address}`);

  // const options = { value: ethers.utils.parseEther("0.01") };
  // const transaction = await membership.mint(
  //   "0xF9ce5E163DcA174851a06c79f19262EEd3356fdD",
  //   address,
  //   options
  // );
  // console.log(transaction);

  // const transaction = await membership.propose(
  //   [],
  //   [],
  //   [],
  //   [],
  //   'https://www.foo.bar'
  // );

  // const transaction = await membership.castVote(1, 1);
  // console.log(transaction);

  // mint token
  // create proposal
};

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

// transaction = await govFacetA.execute(4);
// console.log("execute tx", transaction);

// console.log(transaction);

// transaction = await govFacetA.endVotingTest(4);
// console.log('endvote', transaction);

// transaction = await govFacetA.getVoteSupport(1);
// console.log('execute', transaction);

const getBrandName = async () => {
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    ethersProvider
  );

  return await brand.getBrandName();
};

const getBrandURI = async () => {
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    ethersProvider
  );

  const brandURI = await brand.getBrandURI();
  const updatedURI = brandURI.replace(/^https?:\/\//, "");
  return updatedURI;
};

const getBrandMetadata = async () => {
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    ethersProvider
  );

  const brandMetadataURI = await brand.getBrandMetadataURI();
  return getIPFSJSONData(brandMetadataURI);
};

const getBrandCalldatas = async (name: string) => {
  const brand = new ethers.Contract(
    contracts.diamondAddress,
    contracts.brandFacetAbi,
    ethersProvider
  );

  console.log(name);

  const calldatas = [];

  calldatas.push(brand.interface.encodeFunctionData("setBrandName", [name]));

  return calldatas;
};

const getRoles = async () => {};

const getMembershipNFTImage = async () => {
  const membership = new ethers.Contract(
    contracts.membershipAddress,
    contracts.membershipContractAbi,
    ethersProvider
  );

  const membershipMetadata = await getIPFSJSONData(
    await membership.tokenURI(0)
  );
  const nftImage = await getNftStorageURI(membershipMetadata.image);
  return nftImage;
};

const getMembershipMintPrice = async () => {
  const membership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.membershipFacetAbi,
    ethersProvider
  );

  const mintPrice = await membership.getMintPrice(contracts.membershipAddress);

  return ethers.utils.formatEther(mintPrice);
};

const getMembershipMaxSupply = async () => {
  const membership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.membershipFacetAbi,
    ethersProvider
  );

  const maxSupply = await membership.getMaxSupply(contracts.membershipAddress);
  return maxSupply.toNumber();
};

const getMembershipTotalSupply = async () => {
  const membership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.membershipFacetAbi,
    ethersProvider
  );

  const totalSupply = await membership.getMaxSupply(
    contracts.membershipAddress
  );
  return totalSupply.toNumber();
};

const mintMembership = async (signer: any, address: any) => {
  const membership = new ethers.Contract(
    contracts.diamondAddress,
    contracts.membershipFacetAbi,
    signer
  );

  const options = { value: ethers.utils.parseEther("0.01") };
  await membership.mint(contracts.membershipAddress, address, options);
};

const getProposals = async (proposalCount: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    ethersProvider
  );

  const proposals = [];
  for (let i = 1; i <= proposalCount; i++) {
    const proposal = await governance.getProposal(i);
    proposals.push(proposal);
  }

  return proposals;
};

const getProposal = async (proposalId: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    ethersProvider
  );

  const proposal = await governance.getProposal(proposalId);
  console.log(proposal);
  return proposal;
};

const getProposalCount = async () => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    ethersProvider
  );

  const proposalCount = await governance.getProposalCount();
  return proposalCount.toNumber();
};

const createProposal = async (signer: any, content: any) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  const metadataURI = await uploadContent(content);
  console.log(metadataURI);
  await governance.propose([], [], [], [], metadataURI);
};

const createProposalWithInstructions = async (
  signer: any,
  content: any,
  calldatas: any[]
) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  const metadataURI = await uploadContent(content);
  console.log(metadataURI);

  const targets = [];
  const values = [];
  const signatures = [];

  console.log(calldatas);
  for (const calldata of calldatas) {
    targets.push(contracts.diamondAddress);
    values.push(0);
    signatures.push("");
  }

  await governance.propose(targets, values, signatures, calldatas, metadataURI);
};

const castVote = async (signer: any, proposalId: number, vote: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  await governance.castVote(proposalId, vote);
};

const endVotingTest = async (signer: any, proposalId: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  await governance.endVotingTest(proposalId);
};

const getVoteSupport = async () => {};

const getQuorum = async () => {};

const getProposalDuration = async () => {};

const getVotingStreak = async () => {};

const getVotingStreakMultiplier = async () => {};

const isVotingFinalized = async (proposalId: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    ethersProvider
  );

  await governance.isVotingFinalized(proposalId);
};

const executeProposal = async (signer: any, proposalId: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    signer
  );

  await governance.execute(proposalId);
};

const getVoteCount = async (proposalId: number) => {
  const governance = new ethers.Contract(
    contracts.diamondAddress,
    contracts.governanceAFacetAbi,
    ethersProvider
  );

  const voteCount = await governance.getTotalVotes(proposalId);
  console.log(voteCount);
  return voteCount.toNumber();
};

export {
  castVote,
  createProposal,
  createProposalWithInstructions,
  endVotingTest,
  executeProposal,
  getBrandCalldatas,
  getBrandMetadata,
  getBrandName,
  getBrandURI,
  getIPFSJSONData,
  getMembershipMaxSupply,
  getMembershipMintPrice,
  getMembershipNFTImage,
  getMembershipTotalSupply,
  getNftStorageURI,
  getProposal,
  getProposalCount,
  getProposalDuration,
  getProposals,
  getQuorum,
  getRoles,
  getVoteCount,
  getVoteSupport,
  getVotingStreak,
  getVotingStreakMultiplier,
  mintMembership,
};

export { setBrandUri };
