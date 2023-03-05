// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, Proposal, VoteReceipt} from "../libraries/LibAppStorage.sol";
import {IERC721} from "../shared/interfaces/IERC721.sol";

contract GovernanceBFacet is Modifiers {
    event VoteCast(VoteReceipt voteReciept);

    event ProposalCreated(
        uint256 indexed id,
        address indexed proposer,
        string metadataURI,
        address[] targets,
        uint256[] values,
        string[] signatures,
        bytes[] calldatas,
        uint256 startBlockTimestamp,
        uint256 endBlockTimestamp
    );

    event ExecuteTransaction(bytes32 indexed txHash, address indexed target, uint256 value, string signature, bytes data);

    event ProposalExecuted(uint128 indexed id);

    enum VoteOptions {
        YES,
        NO,
        ABSTAIN
    }

    function createProposal(
        string memory _metadataURI
    ) external returns (uint256) {
        return _propose(new address[](0), new uint256[](0), new string[](0), new bytes[](0), _metadataURI);
    }

    // This function should only be called by governance admin,
    // but since this is a testnet deployment for the hackthon,
    // the permission check has been removed
    function createProposalWithCalldata(
        address[] memory _targets,
        uint256[] memory _values,
        string[] memory _signatures,
        bytes[] memory _calldatas,
        string memory _metadataURI
    ) external returns (uint256) {
        return _propose(_targets, _values, _signatures, _calldatas, _metadataURI);
    }

    function _propose(
        address[] memory _targets,
        uint256[] memory _values,
        string[] memory _signatures,
        bytes[] memory _calldatas,
        string memory _metadataURI
    ) internal returns (uint256) {
        require(
            _targets.length == _values.length && _targets.length == _signatures.length && _targets.length == _calldatas.length,
            "GovernanceFacet: proposal function information parity mismatch."
        );
        // TODO: verify NFT owner
        uint256 _startBlockTimestamp = block.timestamp;

        uint256 newProposalId = s.proposalCount;
        s.proposalCount++;

        Proposal storage newProposal = s.proposals[newProposalId];

        newProposal.id = newProposalId;
        newProposal.proposer = msg.sender;
        newProposal.metadataURI = _metadataURI;
        newProposal.targets = _targets;
        newProposal.values = _values;
        newProposal.signatures = _signatures;
        newProposal.calldatas = _calldatas;
        newProposal.startBlockTimestamp = _startBlockTimestamp;
        newProposal.endBlockTimestamp = _startBlockTimestamp + s.proposalDuration;
        newProposal.quorum = s.quorum;
        newProposal.voteSupport = s.voteSupport;
        newProposal.votingStreak = s.votingStreak;
        newProposal.votingStreakMultiplier = s.votingStreakMultiplier;
        newProposal.forVotes = 0;
        newProposal.againstVotes = 0;
        newProposal.abstainVotes = 0;
        newProposal.canceled = false;
        newProposal.executed = false;

        emit ProposalCreated(
            newProposalId,
            msg.sender,
            _metadataURI,
            _targets,
            _values,
            _signatures,
            _calldatas,
            _startBlockTimestamp,
            _startBlockTimestamp + 1209600
        );

        return newProposalId;
    }

    function checkProposalPassed(Proposal storage _proposal) internal view {
        uint256 totalNonAbstainVotes = _proposal.forVotes + _proposal.againstVotes;
        uint256 totalVotes = totalNonAbstainVotes + _proposal.abstainVotes;
        require(totalVotes >= _proposal.quorum, "GovernanceFacet: Vote total has not met quorum");

        uint256 requiredSupport = (_proposal.voteSupport * totalNonAbstainVotes) / 10000;
        require(totalVotes >= requiredSupport, "GovernanceFacet: Insufficient support for proposal to pass");
    }

    function getRequiredVotes(uint256 _proposalId) public view returns (uint256) {
        Proposal storage proposal = s.proposals[_proposalId];
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        uint256 requiredVotes = (proposal.voteSupport * totalVotes) / 10000;
        return requiredVotes;
    }

    function getForVotes(uint256 _proposalId) public view returns (uint256) {
        return s.proposals[_proposalId].forVotes;
    }

    function getAgainstVotes(uint256 _proposalId) public view returns (uint256) {
        return s.proposals[_proposalId].againstVotes;
    }

    function getAbstainVotes(uint256 _proposalId) public view returns (uint256) {
        return s.proposals[_proposalId].abstainVotes;
    }

    function getTotalVotes(uint256 _proposalId) public view returns (uint256) {
        uint256 totalVotes = s.proposals[_proposalId].forVotes + s.proposals[_proposalId].againstVotes + s.proposals[_proposalId].abstainVotes;
        return totalVotes;
    }

    function isVotingFinalized(uint256 _proposalId) public view returns (bool) {
        return block.timestamp >= s.proposals[_proposalId].endBlockTimestamp;
    }

    function getProposalCount() public view returns (uint256) {
        return s.proposalCount;
    }

    function getProposal(uint256 _id)
        public
        view
        returns (
            uint256,
            address,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            bool
        )
    {
        Proposal storage proposal = s.proposals[_id];

        return (
            proposal.id,
            proposal.proposer,
            proposal.metadataURI,
            proposal.startBlockTimestamp,
            proposal.endBlockTimestamp,
            proposal.quorum,
            proposal.voteSupport,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes,
            proposal.canceled,
            proposal.executed
        );
    }

    function getProposalExecutionData(uint256 _id)
        public
        view
        returns (
            uint256,
            address[] memory,
            uint256[] memory,
            string[] memory,
            bytes[] memory
        )
    {
        Proposal storage proposal = s.proposals[_id];

        return (proposal.id, proposal.targets, proposal.values, proposal.signatures, proposal.calldatas);
    }

    function getQuorum() public view returns (uint256) {
        return s.quorum;
    }

    function setQuorum(uint256 _quorum) public onlyOwner {
        s.quorum = _quorum;
    }

    function getVoteSupport() public view returns (uint256) {
        return s.voteSupport;
    }

    function setVoteSupport(uint256 _voteSupport) public onlyOwner {
        s.voteSupport = _voteSupport;
    }

    function getProposalDuration() public view returns (uint256) {
        return s.proposalDuration;
    }

    function setProposalDuration(uint256 _proposalDuration) public onlyOwner {
        s.proposalDuration = _proposalDuration;
    }

    function getVotingStreak() public view returns (uint256) {
        return s.votingStreak;
    }

    function setVotingStreak(uint256 _votingStreak) public onlyOwner {
        s.votingStreak = _votingStreak;
    }

    function getVotingStreakMultiplier() public view returns (uint256) {
        return s.votingStreakMultiplier;
    }

    function setVotingStreakMultiplier(uint256 _votingStreakMultiplier) public onlyOwner {
        s.votingStreakMultiplier = _votingStreakMultiplier;
    }

    function getVotingPower(address _voter) public view returns (uint256) {
        uint256 voteCount = 0;
        for (uint256 i = 0; i < s.membershipCount; i++) {
            address membershipAddress = s.memberships[i];
            voteCount += IERC721(membershipAddress).balanceOf(_voter);
        }
 
        uint256 votingStreak = getUserVotingStreak(_voter);
        if (votingStreak >= s.votingStreak) {
            voteCount = voteCount * s.votingStreakMultiplier;
        }

        return voteCount;
    }

    function getUserVotingStreak(address _voter) public view returns (uint256) {
        uint256 streak = 0;
        uint256 closedProposalsCount = 0;

        for (uint256 i = s.proposalCount; i > 0; i--) {
            Proposal storage proposal = s.proposals[i - 1];
            bool hasVoted = proposal.receipts[_voter].hasVoted;

            if (proposal.endBlockTimestamp <= block.timestamp) {
                if (!hasVoted) {
                    break;
                }
                closedProposalsCount++;
                streak++;
            }

            if (closedProposalsCount > s.votingStreak) {
                break;
            }
        }
        return streak;
    }

    // this function is for demonstration purposes only and should be removed for production
    function endVotingTest(uint256 _proposalId) public {
        s.proposals[_proposalId].endBlockTimestamp = block.timestamp;
    }

    function execute(uint128 _proposalId) external payable {
        Proposal storage proposal = s.proposals[_proposalId];

        bool votingFinalized = isVotingFinalized(_proposalId);
        require(votingFinalized == true, "GovernanceFacet: Voting is still in progress");

        checkProposalPassed(proposal);

        require(!proposal.executed, "GovernanceFacet: Proposal as already been executed");
        proposal.executed = true;

        for (uint256 i = 0; i < proposal.targets.length; ++i) {
            bytes32 txHash = keccak256(
                abi.encode(proposal.id, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i])
            );

            (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(proposal.calldatas[i]);

            require(success, "GovernanceFacet: transaction execution reverted.");
            emit ExecuteTransaction(txHash, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i]);
        }

        emit ProposalExecuted(_proposalId);
    }

    function castVote(uint128 _proposalId, uint128 _voteOption) external {
        VoteOptions voteOption = VoteOptions(_voteOption);
        return _castVote(msg.sender, _proposalId, voteOption);
    }

    function _castVote(
        address _voter,
        uint128 _proposalId,
        VoteOptions _voteOption
    ) internal {
        Proposal storage proposal = s.proposals[_proposalId];
        bool votingFinalized = isVotingFinalized(_proposalId);
        require(votingFinalized == false, "GovernanceFacet: Voting has completed for this proposal.");

        VoteReceipt storage receipt = proposal.receipts[_voter];

        // Ensure voter has not already voted
        require(!receipt.hasVoted, "GovernanceFacet: voter already voted.");

        uint256 voteCount = getVotingPower(_voter);
        require(voteCount > 0, "GovernanceFacet: You don't have any governance tokens");

        if (_voteOption == VoteOptions.YES) {
            // Increment the for votes in favor
            proposal.forVotes = proposal.forVotes += voteCount;
            receipt.forVotes = voteCount;
        } else if (_voteOption == VoteOptions.NO) {
            // Increment the against votes
            proposal.againstVotes = proposal.againstVotes += voteCount;
            receipt.againstVotes = voteCount;
        } else if (_voteOption == VoteOptions.ABSTAIN) {
            // Increment the abstain votes
            proposal.abstainVotes = proposal.abstainVotes += voteCount;
            receipt.abstainVotes = voteCount;
        }

        // Set receipt attributes based on cast vote parameters
        receipt.hasVoted = true;

        emit VoteCast(receipt);
    }
}
