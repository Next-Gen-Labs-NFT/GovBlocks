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
    rpcUrl:
      "https://eth-goerli.g.alchemy.com/v2/CJ0p2QdZRojuoMvpsiQmMKiRojJXSGvP",
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
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/5ARhjf605RhTL4Umk6keHUxzUu9yI9jC",
    explorerUrl: "https://mumbai.polygonscan.com/",
    walletConfig: {
      chainId: "0x13881",
      chainName: "Polygon Mumbai",
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      nativeCurrency: {
        name: "Matic",
        symbol: "Matic",
        decimals: 18,
      },
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
    diamondAddress: "0xcfdD79502E6D157F48078228Fe4ca8c35D387db5",
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
    rpcUrl:
      "https://wild-virulent-field.base-goerli.discover.quiknode.pro/0a78f06651c877c081a45e6681866ecf05181827",
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
    diamondAddress: "0x167781424CBd2f3DdD1628ED6c30Ef42988FF0f8",
    brandFacetAbi: abiBrandFacet,
    ownershipFacetAbi: abiOwnershipFacet,
    membershipFacetAbi: abiMembershipFacet,
    membershipContractAbi: abiMembershipContract,
    governanceAFacetAbi: abiGovernanceAFacet,
  };

  switch (chain) {
    case "goerli":
      return goerli;
    case "local":
      return local;
    case "mumbai":
      return mumbai;
    case "baseGoerli":
      return baseGoerli;
    default:
      return baseGoerli;
  }
};

export { getContracts };
