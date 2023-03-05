const getChain = (domain: string) => {
	switch (domain) {
		case "governance.govblocksdao.xyz":
			return "mumbai";
		case "governancebase.govblocksdao.xyz":
			return "base";
		case "governancebsc.govblocksdao.xyz":
			return "bsc";
		default:
			return "mumbai";
	}
};

export { getChain };
