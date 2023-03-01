const abiBrandFacet = require("./abi/BrandFacet.json");
const abiOwnershipFacet = require("./abi/ownershipFacet.json");

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
    diamondAddress: "0x99A3dcDD03a4b0a48a39A1A3D75450CfCA5B229F",
    brandFacetAbi: abiBrandFacet,
    ownershipFacetAbi: abiOwnershipFacet,
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
  };

  switch (chain) {
    case "goerli":
      return goerli;
    case "mumbai":
      return mumbai;
    case "baseGoerli":
      return baseGoerli;
    default:
      return baseGoerli;
  }
};

export { getContracts };
