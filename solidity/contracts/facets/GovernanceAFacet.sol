// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, Proposal, VoteReceipt} from "../libraries/LibAppStorage.sol";

contract GovernanceAFacet is Modifiers {

  event ProposalCreated(
    uint256 indexed id,
    address indexed proposer,
    string metadataURI,
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    uint256 startBlock,
    uint256 endBlock
  );

  event ExecuteTransaction(
    bytes32 indexed txHash,
    address indexed target,
    uint256 value,
    string signature,
    bytes data
  );

  event ProposalExecuted(uint128 indexed id);

  function propose(
    address[] memory _targets,
    uint256[] memory _values,
    string[] memory _signatures,
    bytes[] memory _calldatas,
    string memory _metadataURI
  ) external returns (uint256) {

    require(
      _targets.length == _values.length &&
      _targets.length == _signatures.length &&
      _targets.length == _calldatas.length,
      "Governance: proposal function information parity mismatch."
    );

    uint256 _startBlock = block.number + 1;
  
    uint256 newProposalId = s.proposalCount;
    s.proposalCount++;

    Proposal storage newProposal = s.proposals[s.proposalCount];

    newProposal.id = newProposalId;
    newProposal.proposer = msg.sender;
    newProposal.metadataURI = _metadataURI;
    newProposal.targets = _targets;
    newProposal.values = _values;
    newProposal.signatures = _signatures;
    newProposal.calldatas = _calldatas;
    newProposal.startBlock = _startBlock;
    newProposal.endBlock = _startBlock + 1209600;
    newProposal.quorum = 100;
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
      _startBlock,
      _startBlock + 1209600
    );

     return newProposalId;
  }

  function execute(uint128 _proposalId) external payable {
        Proposal storage proposal = s.proposals[_proposalId];

        require(block.number > proposal.endBlock, "Governance: Voting has not completed.");

        proposal.executed = true;

        // Loop through each of the actions in the proposal
        for (uint256 i = 0; i < proposal.targets.length; i++) {
            bytes32 txHash =
                keccak256(
                    abi.encode(
                        proposal.id,
                        proposal.targets[i],
                        proposal.values[i],
                        proposal.signatures[i],
                        proposal.calldatas[i]
                    )
                );

            // Execute action
            bytes memory callData;
            require(bytes(proposal.signatures[i]).length != 0, "Governance: Invalid function signature.");
            callData = abi.encodePacked(bytes4(keccak256(bytes(proposal.signatures[i]))), proposal.calldatas[i]);
            // solium-disable-next-line security/no-call-value
            (bool success, ) = proposal.targets[i].call{ value: proposal.values[i] }(callData);

            require(success, "Governance: transaction execution reverted.");

            emit ExecuteTransaction(
                txHash,
                proposal.targets[i],
                proposal.values[i],
                proposal.signatures[i],
                proposal.calldatas[i]
            );
        }

        emit ProposalExecuted(_proposalId);
    }
/*
    function castVote(uint128 _proposalId, bool _support) external {
        return _castVote(msg.sender, _proposalId, _support);
    }


    function _castVote(
        address _voter,
        uint128 _proposalId,
        bool _support
    ) internal {
       
        Proposal storage proposal = s.proposals[_proposalId];

        require(block.number <= proposal.endBlock, "Governance: Voting has completed.");

        VoteReceipt storage receipt = proposal.receipts[_voter];

        // Ensure voter has not already voted
        require(!receipt.hasVoted, "Governance: voter already voted.");

        // Obtain the token holdings (voting power) for participant at
        // the time voting started. They may have gained or lost tokens
        // since then, doesn't matter.
        uint96 votes = dsDerivaDEX.ddxToken.getPriorVotes(_voter, proposal.startBlock);

        // Ensure voter has nonzero voting power
        require(votes > 0, "Governance: voter has no voting power.");
        if (_support) {
            // Increment the for votes in favor
            proposal.forVotes = proposal.forVotes.add96(votes);
        } else {
            // Increment the against votes
            proposal.againstVotes = proposal.againstVotes.add96(votes);
        }

        // Set receipt attributes based on cast vote parameters
        receipt.hasVoted = true;
        receipt.support = _support;
        receipt.votes = votes;

        emit VoteCast(_voter, _proposalId, _support, votes);
    }
*/
}
