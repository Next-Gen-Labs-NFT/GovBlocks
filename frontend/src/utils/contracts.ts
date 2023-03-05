import { Network } from "alchemy-sdk";

const abiDiamondCutFacet = require("./abi/DiamondCutFacet.json");
const abiDiamondLoupeFacet = require("./abi/DiamondLoupeFacet.json");
const abiBrandFacet = require("./abi/BrandFacet.json");
const abiOwnershipFacet = require("./abi/OwnershipFacet.json");
const abiMembershipFacet = require("./abi/MembershipFacet.json");
const abiGovernanceAFacet = require("./abi/GovernanceAFacet.json");

const abiMembershipContract = require("./abi/MembershipContract.json");

const getContracts = (chain: String) => {
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
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
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
		diamondAddress: "0x8FbE8C2cB0E048aaA22400558407FC9e2c50C79c",
		membershipAddress: "0x8424b3462C25979Db478D213120fE7587DCC459d",
		diamondCutFacetAddress: "0x85d063554c46d287e8D5C4C35d528e2E8D9fa4C1",
		governanceAFacetAddress: "0xc1Bc9E127766c594d5e23cbBC3de7c9dD5994408",
		governanceBFacetAddress: "0xfF6bC2CD2F264a783b245229C9337a062f94eB45",
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
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
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
		diamondAddress: "0xe514086c7eA295FDa634B10661A7F6ceCEFD0947",
		membershipAddress: "0xad25740d6D4Bd503cEa9926a88C2f96Bd5532332",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
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
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
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
			return local;
	}
};

export { getContracts };
