// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Membership721 is ERC721, ERC721URIStorage, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 public maxSupply;
    string private _tokenURI;

    constructor(string memory _name, string memory _URI, uint256 _maxSupply) ERC721(_name, "") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        maxSupply = _maxSupply;
        _tokenURI = _URI;
    }

    function safeMint(address to) public onlyRole(DEFAULT_ADMIN_ROLE) returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < maxSupply, "Cannot mint additional tokens, maxSupply reached");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return _tokenURI;
    }

    function transferDefaultAdmin(address _to)public onlyRole(DEFAULT_ADMIN_ROLE){
        require(_to != address(0), "DEFAULT_ADMIN_ROLE can't be address(0)");
        _grantRole(DEFAULT_ADMIN_ROLE, _to);
        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}