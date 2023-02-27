// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract BrandFacet is Modifiers {
    event RoleCreated(bytes32 roleId);
    event RoleAdded(string name, address account);
    event RoleUpdated(string name, address account);

    function createRole(string name) external {
        require(!isCreated(name), "This role has already been created");
        _roleId = getRoleId(name);
        s.roles[] = Role({
            name: name
        });

        emit RoleCreated(_roleId);
    }

    function grantRole(bytes32 roleId, address account) external {
        require(!hasRole(roleId, account), "Role has already been granted");
        s.roles[roleId].members[account] = true;
    }

    function revokeRole(bytes32 roleId, address account) external {
        require(hasRole(roleId, account), "Role has grant doesn't exist");
        s.roles[roleId].members[account] = false;
    }

    function getRoleId(string memory name) external view returns (bytes32) {
        return keccak256(abi.encodePacked(name));
    }

    function isCreated(string memory name) external view returns (bool) {
        roleId = getRoleId(name);
        return s.roles(roleId);
    }

    function hasRole(bytes32 roleId, address account) external view returns (bool) {
        return s.roles(roleId).members(account);
    }
}
