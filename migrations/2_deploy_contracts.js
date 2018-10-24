var SecretBallot = artifacts.require("./SecretBallot.sol");
module.exports = function(deployer) {
  deployer.deploy(SecretBallot, ['John', 'Jeff', 'Jim'])
};
