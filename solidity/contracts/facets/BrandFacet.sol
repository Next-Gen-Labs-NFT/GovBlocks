// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract BrandFacet is Modifiers {
    event BrandUpdated();

    function setBrandName(
        string memory _name
    ) public onlyOwner {
        s.brand.name = _name;

        emit BrandUpdated();
    }

    function setBrandURI(
        string memory _URI
    ) public onlyOwner {
        s.brand.URI = _URI;

        emit BrandUpdated();
    }

    function setBrandMetadataURI(
        string memory _URI
    ) public onlyOwner {
        s.brand.metadataURI = _URI;

        emit BrandUpdated();
    }

     function getBrandName() public view returns (string memory) {
        return s.brand.name;
    }

    function getBrandURI() public view returns (string memory) {
        return s.brand.URI;
    }

    function getBrandMetadataURI() public view returns (string memory) {
        return s.brand.metadataURI;
    }
}
