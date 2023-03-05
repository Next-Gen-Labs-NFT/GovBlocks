const getChain = () => {
	const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;
	console.log(domain);
	switch (domain) {
		case "governance.govblocksdao.xyz":
			return "mumbai";
		case "governancebase.govblocksdao.xyz":
			return "baseGoerli";
		case "governancebsc.govblocksdao.xyz":
			return "bsc";
		default:
			return "mumbai";
	}
};

export { getChain };
