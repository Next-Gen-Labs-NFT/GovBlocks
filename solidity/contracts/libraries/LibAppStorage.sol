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
  string uri;
  string metadataUri;
}


struct Role {
  string name;
  mapping(address => bool) members;
}

struct Membership {
  uint membershipType;
  uint256[] tokenIds;
  mapping(address => mapping(address => bool)) operators;
  mapping(uint256 => address) approved;
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
  string metadataUri;
  address[] targets;
  uint[] values;
  string[] signatures;
  bytes[] calldatas;
  uint startBlock;
  uint endBlock;
  uint256 quorum;
  uint256 forVotes;
  uint256 againstVotes;
  uint256 abstainVotes;
  bool canceled;
  bool executed;
  mapping (address => VoteReceipt) receipts;
}

struct ParticipationToken {
  address contractId;
  uint256 tokenId;
  uint256 chainId;
}

struct AppStorage {
  Brand brand;
  mapping(bytes32 => Role) roles;
  mapping(bytes32 => Membership) memberships;
  mapping (uint => Proposal) proposals;
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