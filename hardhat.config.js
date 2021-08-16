require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.6.12",
    settings: {
        optimizer: {
            enabled: true,
            runs: 1000
        }
    }
};
