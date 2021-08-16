# prooftrade
A low-cost orderbook-based decentralized exchange for Ethereum

## What does that mean?
- Low-cost: only takes 1 transaction (excluding token approvals)
- Orderbook-based: users offer different prices to buy and sell at
- Decentralized: no trust is needed in anyone
- Exchange: users can trade between different cryptocurrencies
- For Ethereum: any EVM-compatible blockchain is capable of running prooftrade

## What advantages does it offer compared to AMMs (automated market makers)?

| Attribute | prooftrade | UniswapV3 | UniswapV2 |
| --- | --- | --- | --- |
| Freely Licensed | Yes | No | Yes |
| Zero slippage | Yes | No | No |
| Zero LP fees | Almost (only needs approval once) | No | No |
| Allows limit orders | Yes | Yes | No |
| Gas needed per trade | 137,203 | 129,830 | 105,657 |

## Frameworks Used
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v5/)

## Code Structure
- The main contract for a single trading pair is at `contracts/OrderFiller.sol`.

## Example Usage
1. Person A has 3000 USDC, and Person B has 1 WETH.
2. Outside of the blockchain, they agree to trade 3000 USDC for 1WETH.
3. Person A signs a message authorizing person B to make that specific trade (this is done off-chain).
4. Person A sends their signature to Person B (this is also done off-chain).
5. Person B uses that signature to execute the trade on-chain.
6. The `OrderFiller` contract verifies that signature during Person B's Transaction.
7. The trade is completed.

In this example, USDC would be considered token0 and WETH would be token1.
This is because the terminology will make more sense because WETH is thought of in terms of USDC.

- "Buying" is trading USDC for WETH.
- "Selling" is trading WETH for USDC.

Here, Person B would execute the `sell` function, since they are trading their token1 for token0.

## Usage
- Run `npm run test` or `npx hardhat test` to run tests.
- The `OrderFiller` contract can be deployed as a standalone contract for a given pair of tokens.
(Disclaimer: this project is still in development, has some trade-offs to consider (see below), and has not received any audits)

## Things to consider
- A liquidity provider can prevent a trade with them from occurring by transfering their tokens to a different account
    - I'm unsure if I want this to be possible
    - It is good for the liquidity provider because they can cancel their order if they don't like it anymore
    - It is bad because they can spoof orders and waste people's time an gas

## Resources Used
- [https://solidity-by-example.org/signature/](https://solidity-by-example.org/signature/)
