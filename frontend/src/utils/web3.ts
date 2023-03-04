import { ethers, providers } from "ethers";

import { getContracts } from "@/utils/contracts";
const contracts = getContracts("mumbai");

let ethersProvider = new ethers.providers.JsonRpcProvider(contracts.rpcUrl);

const getNftStorageURI = (ipfsURI: string) => {
	const updatedIPFSURI = ipfsURI.replace(/^ipfs?:\/\//, "");
	const nftStorageURI = "https://" + updatedIPFSURI + ".ipfs.nftstorage.link";

	return nftStorageURI;
};

const getIPFSJSONData = async (ipfsURI: string) => {
	const nftStorageURI = getNftStorageURI(ipfsURI);

	const ipfsData = await fetch(nftStorageURI);
	return await ipfsData.json();
};

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
	// console.log("Diamond Address: " + contracts.diamondAddress);
	const govFacetA = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	// const transaction = await membership.safeMint(address);
	// console.log(transaction);

	console.log("Address: " + address);

	// const options = { value: ethers.utils.parseEther("0.01") };
	// const transaction = await membership.mint(
	//   "0xF9ce5E163DcA174851a06c79f19262EEd3356fdD",
	//   address,
	//   options
	// );
	// console.log(transaction);

	const options = {};
	// const transaction = await membership.propose(
	//   [],
	//   [],
	//   [],
	//   [],
	//   'https://www.foo.bar'
	// );

	const transaction = await govFacetA.castVote(1, 1);
	console.log(transaction);

	// console.log("Diamond Address: " + contracts.diamondAddress);
	const membership = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	// const transaction = await membership.safeMint(address);
	// console.log(transaction);

	console.log("Address: " + address);

	// const options = { value: ethers.utils.parseEther("0.01") };
	// const transaction = await membership.mint(
	//   "0xF9ce5E163DcA174851a06c79f19262EEd3356fdD",
	//   address,
	//   options
	// );
	// console.log(transaction);

	const options = {};
	// const transaction = await membership.propose(
	//   [],
	//   [],
	//   [],
	//   [],
	//   'https://www.foo.bar'
	// );

	const transaction = await membership.castVote(1, 1);
	console.log(transaction);

	// mint token
	// create proposal
};

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
	const updatedIPFSURI = brandURI.replace(/^https?:\/\//, "");
	return updatedIPFSURI.split(".")[0];
};

const getBrandMetadata = async () => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.brandFacetAbi,
		ethersProvider
	);

	const brandMetadataURI = await brand.getBrandMetadataURI();
	return await getIPFSJSONData(brandMetadataURI);
};

export {
	getNftStorageURI,
	setBrandUri,
	getBrandName,
	getBrandURI,
	getBrandMetadata,
};
