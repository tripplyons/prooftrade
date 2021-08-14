// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./IERC20.sol";

contract OrderFiller {
    IERC20 token0;
    IERC20 token1;

    // buying and selling are represented as:
    // a limit order lets someone buy token1 with token0
    // a limit order lets someone sell token1 to get token0
    
    // placing a limit buy order would let someone sell to you, so it is considered selling

    mapping (bytes32 => bool) hashesUsed;

    constructor(
        address _token0, address _token1
    ) public {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function getMessageHash(
        address _to, uint _amountIn, uint _amountOut, bool _isBuying, uint _expiration, uint _nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_to, _amountIn, _amountOut, _isBuying, _expiration, _nonce));
    }

    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recover(
        bytes32 h, uint8 v, bytes32 r, bytes32 s
    ) public pure returns (address) {
        address addr = ecrecover(h, v, r, s);

        return addr;
    }

    // `_liquidityProvider` is the address that signs the order
    function buy(
        uint8 v, bytes32 r, bytes32 s, address _liquidityProvider,
        address _buyer, uint _amountIn, uint _amountOut, uint _expiration, uint _nonce
    ) external returns (address) {
        require(msg.sender == _buyer, "Sender does not match signature");
        require(block.number <= _expiration, "Signature is expired");

        bytes32 messageHash = getMessageHash(_buyer, _amountIn, _amountOut, true, _expiration, _nonce);

        require(!hashesUsed[messageHash], "Hash has already been used");
        hashesUsed[messageHash] = true;

        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        
        address signer = recover(ethSignedMessageHash, v, r, s);

        require(signer != address(0), "Signer is 0x0");
        require(signer == _liquidityProvider, "Incorrect signature address");

        require(token0.transferFrom(_buyer, _liquidityProvider, _amountIn), "ERC20 transferFrom buyer failed");
        require(token1.transferFrom(_liquidityProvider, _buyer, _amountOut), "ERC20 transferFrom lp failed");
    }
    
    function sell(
        uint8 v, bytes32 r, bytes32 s, address _liquidityProvider,
        address _seller, uint _amountIn, uint _amountOut, uint _expiration, uint _nonce
    ) external returns (address) {
        require(msg.sender == _seller, "Sender does not match signature");
        require(block.number <= _expiration, "Signature is expired");

        bytes32 messageHash = getMessageHash(_seller, _amountIn, _amountOut, false, _expiration, _nonce);

        require(!hashesUsed[messageHash], "Hash has already been used");
        hashesUsed[messageHash] = true;

        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        
        address signer = recover(ethSignedMessageHash, v, r, s);

        require(signer != address(0), "Signer is 0x0");
        require(signer == _liquidityProvider, "Incorrect signature address");

        require(token1.transferFrom(_seller, _liquidityProvider, _amountIn), "ERC20 transferFrom seller failed");
        require(token0.transferFrom(_liquidityProvider, _seller, _amountOut), "ERC20 transferFrom lp failed");
    }
}
