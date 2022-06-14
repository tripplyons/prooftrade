const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['use-ethers-modal']);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
});
