// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/*
// Brand URI = URI of their frontend interface
// Brand Metadata URI
{
  "name": "CityDAO",
  "description": "CityDAO’s mission is to build an on-chain, community-governed, crypto city of the future.",
  "primary_color": "#08FFA8",
  "logo": "ipfs://"
  "icon": "ipfs://"
}
*/
struct Brand {
    string URI;
    string metadataURI;
}

struct Role {
    string name;
    mapping(address => bool) members;
}

enum MembershipType{ ERC721, ERC1155, ERC20, ERC5643, ERC4907, ERC5320 }

struct Membership {
    MembershipType membershipType;
    address contractAddress;
    uint256 mintPrice;
}

struct VoteReceipt {
    bool hasVoted;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
}

/*
// Proposal metadata
{
  "name": "CityDAO",
  "description": "CityDAO’s mission is to build an on-chain, community-governed, crypto city of the future.",
}
*/
struct Proposal {
    bytes32 id;
    address proposer;
    string metadataURI;
    address[] targets;
    uint256[] values;
    string[] signatures;
    bytes[] calldatas;
    uint256 startBlock;
    uint256 endBlock;
    uint256 quorum;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
    bool canceled;
    bool executed;
    mapping(address => VoteReceipt) receipts;
}

struct ParticipationToken {
    address contractId;
    uint256 tokenId;
    uint256 chainId;
}

struct AppStorage {
    Brand brand;
    mapping(bytes32 => Role) roles;
    Membership[] memberships;
    mapping(address => Membership) membershipsMap;
    mapping(uint256 => Proposal) proposals;
    mapping(uint256 => ParticipationToken) participationTokens;
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }
}

contract Modifiers {
    AppStorage internal s;
}
