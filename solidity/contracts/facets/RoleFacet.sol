// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, Role} from "../libraries/LibAppStorage.sol";

contract RoleFacet is Modifiers {
    event RoleCreated(uint256 roleId);
    event RoleGranted(uint256 roleId, address account);
    event RoleRevoked(uint256 roleId, address account);

    function createRole(string memory _name) public {
        
        uint256 newroleId = s.roleCount;

        Role storage newRole = s.roles[newroleId];
        newRole.name = _name;

        emit RoleCreated(newroleId);
    }

    function grantRole(uint256 _id, address _account) public onlyOwner {
        require(!hasRole(_id, _account), "Role has already been granted");
        s.roles[_id].members[_account] = true;

        emit RoleGranted(_id, _account);
    }

    function revokeRole(uint256 _id, address _account) public onlyOwner {
        require(hasRole(_id, _account), "Role has grant doesn't exist");
        s.roles[_id].members[_account] = false;

        emit RoleRevoked(_id, _account);
    }

    function getRoleCount() public view returns (uint256) {
        return s.roleCount;
    }

    function getRole(uint256 _id) public view returns (
        uint256,
        string memory
    ) {
        Role storage role = s.roles[_id];

        return (
            role.id,
            role.name
        );
    }

    function isCreated(uint256 _id) public view returns (bool) {
        return bytes(s.roles[_id].name).length > 0;
    }

    function hasRole(uint256 _id, address _account) public view returns (bool) {
        return s.roles[_id].members[_account];
    }
}
