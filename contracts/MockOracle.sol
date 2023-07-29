// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract MockOracle {
    uint256 public ethPrice = 2000;
    uint256 public usdtPrice = 1;

    function setETHvUSDPrice(uint256 _updatedPrice) external {
        ethPrice = _updatedPrice;
    }

    function setUSDTvUSDPrice(uint256 _updatedPrice) external {
        usdtPrice = _updatedPrice;
    }

    function getETHvUSDTPrice() external view returns (uint256) {
        return ethPrice * usdtPrice;
    }
}
