// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";
import {IERC721} from "../shared/interfaces/IERC721.sol";

contract MembershipFacet is Modifiers {
    function mint(address _contract, address _to) public payable returns (uint256) {
        require(_contract == s.membershipsMap[_contract].contractAddress,"Invalid contract");
        require(msg.value >= s.membershipsMap[_contract].mintPrice, "Insufficient funds sent");
        return IERC721(_contract).safeMint(_to);
    }
}
