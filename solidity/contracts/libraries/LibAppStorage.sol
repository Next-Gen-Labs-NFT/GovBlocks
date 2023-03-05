// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {LibDiamond} from "../shared/libraries/LibDiamond.sol";

/*
// Brand URI = URI of their frontend interface
// Brand Metadata URI
{
  "name": "CityDAO",
  "description": "CityDAO’s mission is to build an on-chain, community-governed, crypto city of the future.",
  "primary_color": "#08FFA8",
  "logo": "ipfs://"
}
*/
struct Brand {
    string name;
    string URI;
    string metadataURI;
}

struct Role {
    uint256 id;
    string name;
    mapping(address => bool) members;
}

enum MembershipType {
    ERC721,
    ERC1155,
    ERC20,
    ERC5643,
    ERC4907,
    ERC5320
}

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
    uint256 id;
    address proposer;
    string metadataURI;
    address[] targets;
    uint256[] values;
    string[] signatures;
    bytes[] calldatas;
    uint256 startBlockTimestamp;
    uint256 endBlockTimestamp;
    uint256 quorum;
    uint256 voteSupport;
    uint256 votingStreak;
    uint256 votingStreakMultiplier;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
    bool canceled;
    bool executed;
    mapping(address => VoteReceipt) receipts;
    mapping(bytes32 => bool) voted;
}

struct ParticipationToken {
    uint256 id;
    string baseURI;
    uint256 claimExpTimestamp;
}

struct ItemBalancesIO {
    uint256 tokenId;
    uint256 balance;
}

struct AppStorage {
    mapping(uint256 => Role) roles;
    uint256 roleCount;
    uint256 adminRoles;
    Brand brand;
    // Membership[] memberships;
    mapping(address => Membership) membershipsMap;
    mapping(uint256 => address) memberships;
    uint256 membershipCount;
    mapping(uint256 => Proposal) proposals;
    uint256 proposalCount;
    uint256 quorum;
    uint256 voteSupport;
    uint256 proposalDuration;
    uint256 votingStreak;
    uint256 votingStreakMultiplier;
    uint256 adminGovernance;
    ////// Participation
    mapping(uint256 => ParticipationToken) participationTokens;
    uint256 participationTokenCount;
    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) participationBalances;
    mapping(address => uint256[]) participationOwnerItems;
    mapping(address => mapping(uint256 => uint256)) participationOwnerItemBalances;
    // indexes are stored 1 higher so that 0 means no items in items array
    mapping(address => mapping(uint256 => uint256)) participationOwnerItemIndexes;
    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) participationOperatorApprovals;
    mapping(uint256 => uint256) participationTotalSupply;
    uint256 adminParticipation;
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

    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier onlyAdminRoles() {
        require(s.roles[s.adminRoles].members[msg.sender], "RoleFacet: Must be admin");
        _;
    }

    modifier onlyAdminGovernance() {
        require(s.roles[s.adminGovernance].members[msg.sender], "GovernanceFacet: Must be admin");
        _;
    }

     modifier onlyAdminParticipation() {
        require(s.roles[s.adminParticipation].members[msg.sender], "GovernanceFacet: Must be admin");
        _;
    }
}
