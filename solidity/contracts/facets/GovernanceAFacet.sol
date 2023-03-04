// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, Proposal, VoteReceipt} from "../libraries/LibAppStorage.sol";
import {IERC721} from "../shared/interfaces/IERC721.sol";

contract GovernanceAFacet is Modifiers {
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

    function propose(
        address[] memory _targets,
        uint256[] memory _values,
        string[] memory _signatures,
        bytes[] memory _calldatas,
        string memory _metadataURI
    ) external returns (uint256) {
        require(
            _targets.length == _values.length && _targets.length == _signatures.length && _targets.length == _calldatas.length,
            "GovernanceFacet: proposal function information parity mismatch."
        );
        // TODO: verify NFT owner
        uint256 _startBlockTimestamp = block.timestamp;

        s.proposalCount++;
        uint256 newProposalId = s.proposalCount;

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
        uint256 totalVotes = _proposal.forVotes + _proposal.againstVotes;
        require(totalVotes >= _proposal.quorum, "GovernanceFacet: Vote total has not met quorum");

        uint256 requiredVotes = (_proposal.voteSupport * totalVotes) / 10000;

        require(totalVotes >= requiredVotes, "GovernanceFacet: Insufficient votes for proposal to pass");
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

    function isVotingFinalized(uint256 _endBlockTimestamp) public view returns (bool) {
        return block.timestamp >= _endBlockTimestamp;
    }

    function getProposalCount() public view returns (uint256) {
        return s.proposalCount;
    }

    function getProposal(uint256 _id) public view returns (
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
    ) {
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

    function getProposalExecutionData(uint256 _id) public view returns (
        uint256,
        address[] memory,
        uint256[] memory,
        string[] memory,
        bytes[] memory
    ) {
        Proposal storage proposal = s.proposals[_id];

        return (
            proposal.id,
            proposal.targets,
            proposal.values,
            proposal.signatures,
            proposal.calldatas
        );
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

    // this function is for demonstration purposes only and should be removed for production
    function endVotingTest(uint256 _proposalId) public {
        s.proposals[_proposalId].endBlockTimestamp = block.timestamp;
    }

    function execute(uint128 _proposalId) external payable {
        Proposal storage proposal = s.proposals[_proposalId];

        bool votingFinalized = isVotingFinalized(proposal.endBlockTimestamp);

        require(votingFinalized == true, "GovernanceFacet: Voting is still in progress");

        checkProposalPassed(proposal);

        proposal.executed = true;

        // Loop through each of the actions in the proposal
        // for (uint256 i = 0; i < proposal.targets.length; i++) {
        //     bytes32 txHash = keccak256(
        //         abi.encode(proposal.id, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i])
        //     );

        //     // Execute action
        //     bytes memory callData;
        //     // require(bytes(proposal.signatures[i]).length != 0, "GovernanceFacet: Invalid function signature.");
        //     // callData = abi.encodePacked(bytes4(keccak256(bytes(proposal.signatures[i]))), proposal.calldatas[i]);
        //     // // solium-disable-next-line security/no-call-value
        //     // (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(callData);

        //     require(success, "GovernanceFacet: transaction execution reverted.");

        //     emit ExecuteTransaction(txHash, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i]);
        // }
        for (uint256 i = 0; i < proposal.targets.length; ++i) {
            bytes32 txHash = keccak256(
                abi.encode(proposal.id, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i])
            );
            (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(proposal.calldatas[i]);
            // Address.verifyCallResult(success, returndata, errorMessage);
            require(success, "GovernanceFacet: transaction execution reverted.");
            emit ExecuteTransaction(txHash, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i]);
        }

        emit ProposalExecuted(_proposalId);
    }

    function getVoteCount(address _membershipContract) external view returns (uint256) {
        return IERC721(_membershipContract).balanceOf(msg.sender);
    }

    event VoteRequest(address voter, uint128 proposalId, VoteOptions voteOption);

    function castVote(uint128 _proposalId, uint128 _voteOption) external {
        VoteOptions voteOption = VoteOptions(_voteOption);
        return _castVote(msg.sender, _proposalId, voteOption);
    }

    function _castVote(
        address _voter,
        uint128 _proposalId,
        VoteOptions _voteOption
    ) internal {
        emit VoteRequest(_voter, _proposalId, _voteOption);
        Proposal storage proposal = s.proposals[_proposalId];
        bool votingFinalized = isVotingFinalized(proposal.endBlockTimestamp);
        require(votingFinalized == false, "GovernanceFacet: Voting has completed for this proposal.");

        VoteReceipt storage receipt = proposal.receipts[_voter];

        // Ensure voter has not already voted
        require(!receipt.hasVoted, "GovernanceFacet: voter already voted.");

        uint256 voteCount = 0;
        for (uint256 i = 0; i < s.membershipCount; i++) {
            address membershipAddress = s.memberships[i];
            voteCount += IERC721(membershipAddress).balanceOf(_voter);
        }

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
