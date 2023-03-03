// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers, ParticipationToken, ItemBalancesIO} from "../libraries/LibAppStorage.sol";
import {LibERC1155} from "../shared/libraries/LibERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {LibMeta} from "../shared/libraries/LibMeta.sol";
import {LibToken} from "../libraries/LibToken.sol";
import {BrandFacet} from './BrandFacet.sol';

contract ParticipationFacet is Modifiers {
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );

    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );

    event ApprovalForAll(
        address indexed account,
        address indexed operator,
        bool approved
    );

    function createToken(
        string memory _URI,
        uint256 _claimExpTimestamp
    ) public onlyAdminParticipation returns(uint256) {

        uint256 newTokenId = s.participationTokenCount;
        s.participationTokenCount++;

        ParticipationToken storage newToken = s.participationTokens[newTokenId];

        newToken.id = newTokenId;
        newToken.baseURI = _URI;
        newToken.claimExpTimestamp = _claimExpTimestamp;

        return newTokenId;
    }

    function brand() internal view returns (BrandFacet brandFacet) {
        brandFacet = BrandFacet(address(this));
    }

    function name() external view returns (string memory) {
        return brand().getBrandName();
    }

    function symbol() external pure returns (string memory) {
        return "";
    }

    function uri(
        uint256 _id
    ) external view returns (string memory) {
        return s.participationTokens[_id].baseURI;
    }

    function totalSupply(
        uint256 _id
    ) public view virtual returns (uint256) {
        return s.participationTotalSupply[_id];
    }

    function balanceOf(
        address _account,
        uint256 _id
    ) public view returns (uint256) {
        require(_account != address(0), "ParticipationFacet: address zero is not a valid owner");
        return s.participationBalances[_id][_account];
    }

    function balanceOfBatch(
        address[] memory _accounts, 
        uint256[] memory _ids
    ) public view returns (uint256[] memory) {
        require(_accounts.length == _ids.length, "ParticipationFacet: accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](_accounts.length);

        for (uint256 i = 0; i < _accounts.length; ++i) {
            batchBalances[i] = balanceOf(_accounts[i], _ids[i]);
        }

        return batchBalances;
    }

    function balanceOfOwner(
        address _account
    ) public view returns (ItemBalancesIO[] memory output_) {
        uint256 count = s.participationOwnerItems[_account].length;
        output_ = new ItemBalancesIO[](count);
        for (uint256 i; i < count; i++) {
            uint256 tokenId = s.participationOwnerItems[_account][i];
            output_[i].balance = s.participationOwnerItemBalances[_account][tokenId];
            output_[i].tokenId = tokenId;
        }
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) public {
        require(_from == LibMeta.msgSender() || isApprovedForAll(_from, LibMeta.msgSender()), "ParticipationFacet: caller is not token owner or approved");

        _safeTransferFrom(_from, _to, _id, _amount, _data);
    }

    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) public {
        require(_from == LibMeta.msgSender() || isApprovedForAll(_from, LibMeta.msgSender()), "ParticipationFacet: caller is not token owner or approved");

        _safeBatchTransferFrom(_from, _to, _ids, _amounts, _data);
    }

    function _safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) internal {
        require(_to != address(0), "ParticipationFacet: transfer to the zero address");

        uint256[] memory _ids = LibToken.asSingletonArray(_id);
        uint256[] memory _amounts = LibToken.asSingletonArray(_amount);

        _beforeTokenTransfer(LibMeta.msgSender(), _from, _to, _ids, _amounts, _data);

        LibToken.removeFromOwner(_from, _id, _amount);
        LibToken.addToOwner(_to, _id, _amount);

        emit TransferSingle(LibMeta.msgSender(), _from, _to, _id, _amount);

        _doSafeTransferAcceptanceCheck(LibMeta.msgSender(), _from, _to, _id, _amount, _data);
    }

    function _safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal {
        require(_ids.length == _amounts.length, "ParticipationFacet: ids and amounts length mismatch");
        
        _beforeTokenTransfer(LibMeta.msgSender(), _from, _to, _ids, _amounts, _data);

        for (uint256 i = 0; i < _ids.length; ++i) {
            uint256 _id = _ids[i];
            uint256 _amount = _amounts[i];

            LibToken.removeFromOwner(_from, _id, _amount);
            LibToken.addToOwner(_to, _id, _amount);
        }

        emit TransferBatch(LibMeta.msgSender(), _from, _to, _ids, _amounts);

        _doSafeBatchTransferAcceptanceCheck(LibMeta.msgSender(), _from, _to, _ids, _amounts, _data);
    }

    function mint(
        address _to, 
        uint256 _id, 
        uint256 _amount,
        bytes memory _data
    ) public {
        require(_to != address(0), "ParticipationFacet: mint to the zero address");

        // TODO: Check if the claim expiration time has passed

        uint256[] memory _ids = LibToken.asSingletonArray(_id);
        uint256[] memory _amounts = LibToken.asSingletonArray(_amount);

        _beforeTokenTransfer(LibMeta.msgSender(), address(0), _to, _ids, _amounts, _data);

        s.participationBalances[_id][_to] += _amount;
        emit TransferSingle(LibMeta.msgSender(), address(0), _to, _id, _amount);

        _doSafeTransferAcceptanceCheck(LibMeta.msgSender(), address(0), _to, _id, _amount, _data);
    }

    function _mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal virtual {
        require(_to != address(0), "ParticipationFacet: mint to the zero address");
        require(_ids.length == _amounts.length, "ParticipationFacet: ids and amounts length mismatch");

        _beforeTokenTransfer(LibMeta.msgSender(), address(0), _to, _ids, _amounts, _data);

        for (uint256 i = 0; i < _ids.length; i++) {
            s.participationBalances[_ids[i]][_to] += _amounts[i];
        }

        emit TransferBatch(LibMeta.msgSender(), address(0), _to, _ids, _amounts);

        _doSafeBatchTransferAcceptanceCheck(LibMeta.msgSender(), address(0), _to, _ids, _amounts, _data);
    }

   
    function setApprovalForAll(
        address _owner,
        address _operator,
        bool _approved
    ) external {
        require(_owner != _operator, "ParticipationFacet: setting approval status for self");
        s.participationOperatorApprovals[_owner][_operator] = _approved;
        emit ApprovalForAll(_owner, _operator, _approved);
    }

    function isApprovedForAll(
        address _owner,
        address _operator
    ) public view returns (bool approved_) {
        approved_ = s.participationOperatorApprovals[_owner][_operator];
    }

    function _beforeTokenTransfer(
        address,
        address _from,
        address _to,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) internal virtual {
        require(_from == address(0) || _to == address(0), "ParticipationFacet: This a Non-transferrable token. It cannot be transferred. It can only be burned by the token owner.");
    }

    function _doSafeTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) private {
        if (isContract(_to)) {
            try IERC1155Receiver(_to).onERC1155Received(_operator, _from, _id, _amount, _data) returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("ParticipationFacet: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ParticipationFacet: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) private {
        if (isContract(_to)) {
            try IERC1155Receiver(_to).onERC1155BatchReceived(_operator, _from, _ids, _amounts, _data) returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155BatchReceived.selector) {
                    revert("ParticipationFacet: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ParticipationFacet: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function isContract(address _account) internal view returns (bool) {
        return _account.code.length > 0;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
