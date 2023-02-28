// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract RoleFacet is Modifiers {
    event RoleCreated(bytes32 roleId);
    event RoleGranted(bytes32 roleId, address account);
    event RoleRevoked(bytes32 roleId, address account);

    function createRole(string memory name) public {
        require(!isCreated(name), "This role has already been created");
        bytes32 roleId = getRoleId(name);
        s.roles[roleId].name = name;

        emit RoleCreated(roleId);
    }

    function grantRole(bytes32 roleId, address account) public {
        require(!hasRole(roleId, account), "Role has already been granted");
        s.roles[roleId].members[account] = true;

        emit RoleGranted(roleId, account);
    }

    function revokeRole(bytes32 roleId, address account) public {
        require(hasRole(roleId, account), "Role has grant doesn't exist");
        s.roles[roleId].members[account] = false;

        emit RoleRevoked(roleId, account);
    }

    function getRoleId(string memory name) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(name));
    }

    function isCreated(string memory name) public view returns (bool) {
        bytes32 roleId = getRoleId(name);
        return bytes(s.roles[roleId].name).length > 0;
    }

    function hasRole(bytes32 roleId, address account) public view returns (bool) {
        return s.roles[roleId].members[account];
    }
}
