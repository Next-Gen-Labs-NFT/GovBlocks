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
		diamondAddress: "0xD93A99f2D3B6aFaA1fc68C8F2eF361e75Cb96169",
		membershipAddress: "0x6634af69181C0e2E93F4e1Ef65216Ab2Ff0eEdC3",
		diamondCutFacetAddress: "0xDceC622392b4F073E17633D87bdEDEEb0F1Fc81f",
		governanceAFacetAddress: "0xa0232d3c8BAF085C7d5a216f7644e0A0a13688c3",
		governanceBFacetAddress: "0x9a04DF919ba583fDC081c8aA0557B9CB3546B943",
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
		diamondAddress: "0x8754E65059A33DE0E1beE2979B20Ff167BBcc5DB",
		membershipAddress: "0x9f1E274100459C462b9dD17dE01a64347448872a",
		diamondCutFacetAddress: "0x1602d350c2a178B24af7Fee3Eff8eaEf36b0E63B",
		governanceAFacetAddress: "0xA846466E8bdCd0A4Dd1b68D9A2c7AFFc30122A1e",
		governanceBFacetAddress: "0x45bb79be6A7DE47DdD2D4D4Fde7e478Ee293a36b",
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
