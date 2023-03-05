import { Network } from "alchemy-sdk";

const abiDiamondCutFacet = require("./abi/DiamondCutFacet.json");
const abiDiamondLoupeFacet = require("./abi/DiamondLoupeFacet.json");
const abiBrandFacet = require("./abi/BrandFacet.json");
const abiOwnershipFacet = require("./abi/OwnershipFacet.json");
const abiMembershipFacet = require("./abi/MembershipFacet.json");
const abiGovernanceAFacet = require("./abi/GovernanceAFacet.json");

const abiMembershipContract = require("./abi/MembershipContract.json");

const getContracts = (chain: String) => {
	console.log(chain);
	const goerli = {
		chain: "goerli",
		chainId: 5,
		chainIdHex: "0x5",
		chainName: "Goerli Testnet",
		rpcUrl: "https://eth-goerli.g.alchemy.com/v2/CJ0p2QdZRojuoMvpsiQmMKiRojJXSGvP",
		explorerUrl: "https://goerli.etherscan.io/",
		walletConfig: {
			chainId: "0x5",
			chainName: "Goerli",
			rpcUrls: ["https://goerli.infura.io/v3/"],
			nativeCurrency: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18,
			},
			blockExplorerUrls: ["https://goerli.etherscan.io"],
		},
		membershipAddress: "",
		diamondAddress: "",
		diamondCutFacetAddress: "",
		diamondLoupeFacetAddress: "",
		ownershipFacetAddress: "",
		brandFacetAddress: "",
		roleFacetAddress: "",
		membershipFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		participationFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const mumbai = {
		chain: "mumbai",
		chainId: 80001,
		chainIdHex: "0x13881",
		chainName: "Polygon Mumbai Testnet",
		rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/5ARhjf605RhTL4Umk6keHUxzUu9yI9jC",
		explorerUrl: "https://mumbai.polygonscan.com/",
		walletConfig: {
			chainId: "0x13881",
			chainName: "Polygon Mumbai",
			rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
			nativeCurrency: {
				name: "Matic",
				symbol: "MATIC",
				decimals: 18,
			},
			blockExplorerUrls: ["https://mumbai.polygonscan.com"],
		},
		membershipAddress: "0x6634af69181C0e2E93F4e1Ef65216Ab2Ff0eEdC3",
		diamondAddress: "0xD93A99f2D3B6aFaA1fc68C8F2eF361e75Cb96169",
		diamondCutFacetAddress: "0xDceC622392b4F073E17633D87bdEDEEb0F1Fc81f",
		diamondLoupeFacetAddress: "0x47E62d1bDC0FdD9F7e99436AAF91903CC43Bc1Bf",
		ownershipFacetAddress: "0xb320782008f7fB9AAD086a8c97093A4938be2CA5",
		brandFacetAddress: "0xB3c14D8000f9BA9112aeC84782Ca405095Fc6BBa",
		roleFacetAddress: "0x7c2DBaFA0abdf67951870C9Ded841e19cd826393",
		membershipFacetAddress: "0x805a63ebB2D0093ce1ECd1d4404C16C9562E9c64",
		governanceAFacetAddress: "0xa0232d3c8BAF085C7d5a216f7644e0A0a13688c3",
		governanceBFacetAddress: "0x9a04DF919ba583fDC081c8aA0557B9CB3546B943",
		participationFacetAddress: "0xA445d0250145914D845Ca2224bB15baCFD763BA8",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const baseGoerli = {
		chain: "baseGoerli",
		chainId: 84531,
		chainIdHex: "0x14A33",
		chainName: "Base Goerli Testnet",
		rpcUrl: "https://wild-virulent-field.base-goerli.discover.quiknode.pro/0a78f06651c877c081a45e6681866ecf05181827",
		explorerUrl: "https://goerli.basescan.org/",
		walletConfig: {
			chainId: "0x14A33",
			chainName: "Base Goerli",
			rpcUrls: ["https://goerli.base.org"],
			nativeCurrency: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18,
			},
			blockExplorerUrls: ["https://goerli.basescan.org"],
		},
		membershipAddress: "0x9Ecea8D00a35a16BAd5f18cea5901002c47704a0",
		diamondAddress: "0xad25740d6D4Bd503cEa9926a88C2f96Bd5532332",
		diamondCutFacetAddress: "0x86829b96f402601A48Cc2d15072e55315a8bd5eC",
		diamondLoupeFacetAddress: "0xe514086c7eA295FDa634B10661A7F6ceCEFD0947",
		ownershipFacetAddress: "0xf71DfAE60afF4255Eac60e76a31a7EC09863B235",
		brandFacetAddress: "0x05D0C33485de0DeBc14845C249dEE17031D03C55",
		roleFacetAddress: "0x78b91D5327B96b9179b5B9a8a5f0C2f831c7D256",
		membershipFacetAddress: "0x42d255241A91ABEc4fe8cFBf9cfA33cb2729973f",
		governanceAFacetAddress: "0x9EB548238B09046bc702F2b6c594562eCCEB04EA",
		governanceBFacetAddress: "0xeE5bCF42F001C1c93125C5296e1634B1378aad57",
		participationFacetAddress: "0x93125ab70c6639EE4F9e676bE97D2EE4bF6eBb30",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const bsc = {
		chain: "Smart Chain - Testnet",
		chainId: 97,
		chainIdHex: "0x61",
		chainName: "Binance Smartchain testnet",
		rpcUrl: "https://special-long-star.bsc-testnet.discover.quiknode.pro/72407a9fdc8bdfb3a8971c536729631327b81b15/",
		explorerUrl: "https://mumbai.polygonscan.com/",
		walletConfig: {
			chainId: "0x61",
			chainName: "Binance Smartchain testnet",
			rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
			nativeCurrency: {
				name: "tBNB",
				symbol: "tBNB",
				decimals: 18,
			},
			blockExplorerUrls: ["https://testnet.bscscan.com"],
		},
		membershipAddress: "0xdaDC16623BEcADD7a04b1b83769419E9d82Ec1D6",
		diamondAddress: "0xB97b38235f8C2Bec0cB42a2f78aADB69c35FB1e7",
		diamondCutFacetAddress: "0x3680744DfB4737Dc00F7a6Cb284D7989c4af13FF",
		diamondLoupeFacetAddress: "0x1789Ef33B571Ba21022bd41Cc55f09C6f12055FF",
		ownershipFacetAddress: "0x0B484BE8F64c16A1d7970Ec82382DC14984C1cF6",
		brandFacetAddress: "0xCfeAa0354eB6a3eb68BA47e32673d26b5edFBD76",
		roleFacetAddress: "0xB977147C4812F664255eaC59F8C93cd5eCDBF885",
		membershipFacetAddress: "0xf31063020D2cd7442960868d4d0061dA36805372",
		governanceAFacetAddress: "0xa37FA6bb4AAfFA9c297d270bD0A5891Aa929E04D",
		governanceBFacetAddress: "0x7dC7932CEADb897aaCFFA4025c154833af6B752f",
		participationFacetAddress: "0x4B513f9F19341806c4b3F73110B87a4E213096df",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const local = {
		chain: "local",
		chainId: 31337,
		chainIdHex: "0x13881",
		chainName: "Local",
		rpcUrl: "http://localhost:8545",
		explorerUrl: "None",
		walletConfig: {
			chainId: "0x13881",
			chainName: "Local",
			rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
			nativeCurrency: {
				name: "Matic",
				symbol: "MATIC",
				decimals: 18,
			},
			blockExplorerUrls: ["https://mumbai.polygonscan.com"],
		},
		membershipAddress: "",
		diamondAddress: "",
		diamondCutFacetAddress: "",
		diamondLoupeFacetAddress: "",
		ownershipFacetAddress: "",
		brandFacetAddress: "",
		roleFacetAddress: "",
		membershipFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		participationFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	switch (chain) {
		case "goerli":
			return goerli;
		case "mumbai":
			return mumbai;
		case "baseGoerli":
			return baseGoerli;
		case "bsc":
			return bsc;
		case "local":
			return local;
		default:
			return mumbai;
	}
};

export { getContracts };
