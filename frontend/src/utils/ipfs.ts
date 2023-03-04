import { NFTStorage } from "nft.storage";

const API_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFEOGQ1Q2RDZUJkMkEwZDA0MDRBN0QyZDk2MDM0MTZlNGQ4RDVlQTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Nzg4OTMxNzk5MiwibmFtZSI6IkVUSERlbnZlciJ9.MafEDNEZ4BbtSjzra-smnfOLD-IFgkmZsnoMSq6x3cU";

const uploadContent = async (content: any) => {
	const client = new NFTStorage({ token: API_KEY });

	const blob = new Blob([JSON.stringify(content)], {
		type: "application/json",
	});

	const file = new File([blob], "metadata.json", {
		type: "application/json",
	});

	const cid = await client.storeDirectory([file]);
	return "ipfs://" + cid + "/metadata.json";
};

export { uploadContent };
