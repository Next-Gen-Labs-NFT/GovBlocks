// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {LibAppStorage, AppStorage} from "./LibAppStorage.sol";

library LibToken {
    function addToOwner(
        address _to,
        uint256 _id,
        uint256 _value
    ) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        s.participationBalances[_id][_to] += _value;
        s.participationOwnerItemBalances[_to][_id] += _value;
        if (s.participationOwnerItemIndexes[_to][_id] == 0) {
            s.participationOwnerItems[_to].push(_id);
            s.participationOwnerItemIndexes[_to][_id] = s.participationOwnerItems[_to].length;
        }
    }

    function removeFromOwner(
        address _from,
        uint256 _id,
        uint256 _value
    ) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        uint256 bal = s.participationBalances[_id][_from];
        require(_value <= bal, "LibItems: insufficient balance for transfer");
        bal -= _value;

        s.participationBalances[_id][_from] = bal;
        s.participationOwnerItemBalances[_from][_id] = bal;
        if (bal == 0) {
            uint256 index = s.participationOwnerItemIndexes[_from][_id] - 1;
            uint256 lastIndex = s.participationOwnerItems[_from].length - 1;
            if (index != lastIndex) {
                uint256 lastId = s.participationOwnerItems[_from][lastIndex];
                s.participationOwnerItems[_from][index] = lastId;
                s.participationOwnerItemIndexes[_from][lastId] = index + 1;
            }
            s.participationOwnerItems[_from].pop();
            delete s.participationOwnerItemIndexes[_from][_id];
        }
    }

    function asSingletonArray(
        uint256 element
    ) internal pure returns (uint256[] memory)
    {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}
