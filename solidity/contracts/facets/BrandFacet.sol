// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract BrandFacet is Modifiers {
    event BrandURIUpdated(string URI);
    event BrandMetadataURIUpdated(string URI);

    function setBrandURI(string memory _URI) public {
        s.brand.URI = _URI;

        emit BrandURIUpdated(_URI);
    }

    function setBrandMetadataURI(string memory _URI) public {
        s.brand.metadataURI = _URI;

        emit BrandMetadataURIUpdated(_URI);
    }

    function getBrandURI() public view returns (string memory) {
        return s.brand.URI;
    }

    function getBrandMetadataURI() public view returns (string memory) {
        return s.brand.metadataURI;
    }
}
