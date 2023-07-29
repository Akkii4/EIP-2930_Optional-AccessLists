// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { MockOracle } from "./MockOracle.sol";

contract BasicCaller {
    address private _dummyOracle;
    uint256 private _latestPrice;

    event PriceUpdated(uint256 price, uint256 indexed lastUpdated);

    constructor(address _dummyOracleAddress) {
        require(_dummyOracleAddress != address(0), "Invalid contract address");

        _dummyOracle = _dummyOracleAddress;
    }

    function fetchPrice() external {
        _latestPrice = MockOracle(_dummyOracle).getETHvUSDTPrice() * 1e18;
    }

    function resetPrice() external {
        require(_latestPrice != 0, "price not set");
        _latestPrice = 0;
    }
}
