// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract BrandFacet is Modifiers {
    event BrandUpdated(string name, string uri);

    function setBrandUri(string memory _uri) external {
        s.brand.uri = _uri;
    }

    function setBrandMetadataUri(string memory _uri) external {
        s.brand.metadataUri = _uri;
    }

    function getBrandUri() external view returns (string memory) {
        return s.brand.uri;
    }

    function getBrandMetadataUri() external view returns (string memory) {
        return s.brand.metadataUri;
    }
}
