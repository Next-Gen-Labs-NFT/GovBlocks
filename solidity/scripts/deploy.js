/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

async function deployDiamond() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const MembershipContract = await ethers.getContractFactory("Membership721");
  const membershipContract = await MembershipContract.deploy(
    "GovBlocks DAO Contributor",
    "ipfs://bafkreiblslqnsezwf4kur6iwdkcvxpcauvlxmlxrmkuk3hogheqj7jvuwi",
    1
  );
  await membershipContract.deployed();
  console.log("MembershipContract deployed:", membershipContract.address);

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.deployed();
  console.log("DiamondCutFacet deployed:", diamondCutFacet.address);

  // deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(
    contractOwner.address,
    diamondCutFacet.address
  );
  await diamond.deployed();
  console.log("Diamond deployed:", diamond.address);

  // deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const DiamondInit = await ethers.getContractFactory("InitDiamond");
  const diamondInit = await DiamondInit.deploy();
  const args = [
    [
      "GovBlocks DAO",
      "https://govblocksdao.govblocks.xyz",
      "ipfs://bafkreiciujrwcjqhyhnn45jdvahwob7nsh3yroyjnlpgz7wnyz4gi6fpgm",
      ethers.BigNumber.from("0"),
      membershipContract.address,
      ethers.utils.parseEther("0.01"),
      259200000,
      1,
      1,
      1,
      1,
    ],
  ];
  await diamondInit.deployed();
  console.log("InitDiamond deployed:", diamondInit.address);
  const functionCall = diamondInit.interface.encodeFunctionData("init", args);

  // deploy facets
  console.log("Deploying facets");
  const FacetNames = [
    "DiamondLoupeFacet",
    "OwnershipFacet",
    "BrandFacet",
    "RoleFacet",
    "MembershipFacet",
    "GovernanceAFacet",
    "GovernanceBFacet",
    "ParticipationFacet",
  ];
  const cut = [];
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.deployed();
    console.log(`${FacetName} deployed: ${facet.address}`);
    if (FacetName !== "GovernanceBFacet") {
      cut.push({
        facetAddress: facet.address,
        action: FacetCutAction.Add,
        functionSelectors: getSelectors(facet),
      });
    }
  }

  // upgrade diamond with facets
  console.log("");
  console.log("Diamond Cut:", cut);
  const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.address);
  let tx;
  let receipt;
  // call to init function
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall);
  console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond cut");

  // transfer ownership of contract
  const ownership = await ethers.getContractAt(
    "OwnershipFacet",
    diamond.address,
    contractOwner
  );
  let ownershipTx;
  let ownershipReceipt;

  ownershipTx = await ownership.transferOwnership(diamond.address);

  ownershipReceipt = await ownershipTx.wait();
  if (!ownershipReceipt.status) {
    throw Error(
      `Failed to assign ownership of diamond contract: ${ownershipTx.hash}`
    );
  }
  console.log("Completed transfer of ownership");

  await membershipContract.transferDefaultAdmin(diamond.address);

  console.log("transferred ownership of membership contract to Diamond");
  return diamond.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.deployDiamond = deployDiamond;
