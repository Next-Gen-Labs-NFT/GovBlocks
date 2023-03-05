// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, MembershipType, Membership} from "../libraries/LibAppStorage.sol";
import {IERC721} from "../shared/interfaces/IERC721.sol";

contract MembershipFacet is Modifiers {
    event MembershipMinted(address _contract, address _to);

    function mint(address _contract, address _to) public payable returns (uint256) {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        require(msg.value >= s.membershipsMap[_contract].mintPrice, "Insufficient funds sent");

        uint256 mintAction = IERC721(_contract).safeMint(_to);
        emit MembershipMinted(_contract, _to);
        return mintAction;
    }

    function getMembershipCount() public view returns (uint256) {
        return s.membershipCount;
    }

    function getMembership(uint256 _id)
        public
        view
        returns (
            MembershipType,
            address,
            uint256
        )
    {
        Membership storage membership = s.membershipsMap[s.memberships[_id]];

        return (membership.membershipType, membership.contractAddress, membership.mintPrice);
    }

    function getTotalSupply(address _contract) public view returns (uint256) {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        return IERC721(_contract).totalSupply();
    }

    function getMaxSupply(address _contract) public view returns (uint256) {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        return IERC721(_contract).maxSupply();
    }

    function setMaxSupply(address _contract, uint256 _maxSupply) public onlyOwner {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        IERC721(_contract).setMaxSupply(_maxSupply);
    }

    function getMintPrice(address _contract) public view returns (uint256) {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        return s.membershipsMap[_contract].mintPrice;
    }

    

    function setMintPrice(address _contract, uint256 _price) public onlyOwner {
        require(_contract == s.membershipsMap[_contract].contractAddress, "Invalid contract");
        s.membershipsMap[_contract].mintPrice = _price;
    }
}
