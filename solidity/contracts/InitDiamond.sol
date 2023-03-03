// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {AppStorage, Membership, MembershipType} from "./libraries/LibAppStorage.sol";
import {LibDiamond} from "./shared/libraries/LibDiamond.sol";
import {IDiamondCut} from "./shared/interfaces/IDiamondCut.sol";
import {IERC165} from "./shared/interfaces/IERC165.sol";
import {IDiamondLoupe} from "./shared/interfaces/IDiamondLoupe.sol";
import {IERC173} from "./shared/interfaces/IERC173.sol";

// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init function if you need to.

contract InitDiamond {
    AppStorage internal s;
    struct Args {
        string brandURI;
        string brandMetadataURI;
        MembershipType membershipType;
        address membershipContractAddress;
        uint256 membershipMintPrice;
        uint256 proposalDuration;
        uint256 quorum;
        uint256 voteSupport;
        uint256 votingStreak;
        uint256 votingStreakMultiplier;
    }

    // You can add parameters to this function in order to pass in
    // data to set your own state variables
    function init(Args memory _args) external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        s.brand.URI = _args.brandURI;
        s.brand.metadataURI = _args.brandMetadataURI;
        s.membershipsMap[_args.membershipContractAddress] = Membership({
            membershipType: _args.membershipType,
            contractAddress: _args.membershipContractAddress,
            mintPrice: _args.membershipMintPrice
        });
        s.memberships[s.membershipCount] = _args.membershipContractAddress;
        s.membershipCount++;
        s.proposalDuration = _args.proposalDuration;
        s.quorum = _args.quorum;
        s.voteSupport = _args.voteSupport;
        s.votingStreak = _args.votingStreak;
        s.votingStreakMultiplier = _args.votingStreakMultiplier;

        // add your own state variables
        // EIP-2535 specifies that the `diamondCut` function takes two optional
        // arguments: address _init and bytes calldata _calldata
        // These arguments are used to execute an arbitrary function using delegatecall
        // in order to set state variables in the diamond during deployment or an upgrade
        // More info here: https://eips.ethereum.org/EIPS/eip-2535#diamond-interface
    }
}
