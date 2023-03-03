// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, Proposal, VoteReceipt} from "../libraries/LibAppStorage.sol";
import {IERC721} from "../shared/interfaces/IERC721.sol";

contract GovernanceAFacet is Modifiers {
    event VoteCast(VoteReceipt voteReciept);

    enum voteOptions {
        YES,
        NO,
        ABSTAIN
    }

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

    function propose(
        address[] memory _targets,
        uint256[] memory _values,
        string[] memory _signatures,
        bytes[] memory _calldatas,
        string memory _metadataURI
    ) external returns (uint256) {
        require(
            _targets.length == _values.length && _targets.length == _signatures.length && _targets.length == _calldatas.length,
            "Governance: proposal function information parity mismatch."
        );
        // TODO: verify NFT owner
        uint256 _startBlockTimestamp = block.timestamp;

        s.proposalCount++;
        uint256 newProposalId = s.proposalCount;

        Proposal storage newProposal = s.proposals[s.proposalCount];

        newProposal.id = newProposalId;
        newProposal.proposer = msg.sender;
        newProposal.metadataURI = _metadataURI;
        newProposal.targets = _targets;
        newProposal.values = _values;
        newProposal.signatures = _signatures;
        newProposal.calldatas = _calldatas;
        newProposal.startBlockTimestamp = _startBlockTimestamp;
        newProposal.endBlockTimestamp = _startBlockTimestamp + 1209600;
        newProposal.quorum = s.quorum;
        newProposal.voteSupport = s.voteSupport;
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
        require(totalVotes >= _proposal.quorum, "Governance: Vote total has not met quorum");

        uint256 requiredVotes = (_proposal.voteSupport * totalVotes) / 10000;

        require(requiredVotes >= totalVotes, "Governance: Insufficient votes for proposal to pass");
    }

    function isVotingFinalized(uint256 _endBlockTimestamp) internal view returns (bool) {
        return block.timestamp >= _endBlockTimestamp;
    }

    function execute(uint128 _proposalId) external payable {
        Proposal storage proposal = s.proposals[_proposalId];

        bool votingFinalized = isVotingFinalized(proposal.endBlockTimestamp);

        require(votingFinalized == true, "Governance: Voting is still in progress");

        checkProposalPassed(proposal);

        proposal.executed = true;

        // Loop through each of the actions in the proposal
        for (uint256 i = 0; i < proposal.targets.length; i++) {
            bytes32 txHash = keccak256(
                abi.encode(proposal.id, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i])
            );

            // Execute action
            bytes memory callData;
            require(bytes(proposal.signatures[i]).length != 0, "Governance: Invalid function signature.");
            callData = abi.encodePacked(bytes4(keccak256(bytes(proposal.signatures[i]))), proposal.calldatas[i]);
            // solium-disable-next-line security/no-call-value
            (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(callData);

            require(success, "Governance: transaction execution reverted.");

            emit ExecuteTransaction(txHash, proposal.targets[i], proposal.values[i], proposal.signatures[i], proposal.calldatas[i]);
        }

        emit ProposalExecuted(_proposalId);
    }

    function castVote(uint128 _proposalId, voteOptions _voteOption) external {
        return _castVote(msg.sender, _proposalId, _voteOption);
    }

    function _castVote(
        address _voter,
        uint128 _proposalId,
        voteOptions _voteOption
    ) internal {
        Proposal storage proposal = s.proposals[_proposalId];
        bool votingFinalized = isVotingFinalized(proposal.endBlockTimestamp);
        require(votingFinalized == false, "Governance: Voting has completed for this proposal.");

        VoteReceipt storage receipt = proposal.receipts[_voter];

        // Ensure voter has not already voted
        require(!receipt.hasVoted, "Governance: voter already voted.");

        address membershipAddress = s.membershipsMap[_voter].contractAddress;
        uint256 voteCount = IERC721(membershipAddress).balanceOf(_voter);

        if (_voteOption == voteOptions.YES) {
            // Increment the for votes in favor
            proposal.forVotes = proposal.forVotes += voteCount;
            receipt.forVotes = voteCount;
        } else if (_voteOption == voteOptions.NO) {
            // Increment the against votes
            proposal.againstVotes = proposal.againstVotes += voteCount;
            receipt.againstVotes = voteCount;
        } else {
            proposal.abstainVotes = proposal.abstainVotes += voteCount;
            receipt.abstainVotes = voteCount;
        }

        // Set receipt attributes based on cast vote parameters
        receipt.hasVoted = true;
        emit VoteCast(receipt);
    }
}
