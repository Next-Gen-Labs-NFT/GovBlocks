// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract BrandFacet is Modifiers {
    event BrandUriUpdated(string uri);
    event BrandMetadataUriUpdated(string uri);

    function setBrandUri(string memory url) public {
        s.brand.uri = url;

        emit BrandUriUpdated(url);
    }

    function setBrandMetadataUri(string memory url) public {
        s.brand.metadataUri = url;

        emit BrandMetadataUriUpdated(url);
    }

    function getBrandUri() public view returns (string memory) {
        return s.brand.uri;
    }

    function getBrandMetadataUri() public view returns (string memory) {
        return s.brand.metadataUri;
    }
}
