var SecretBallot = artifacts.require("SecretBallot");
module.exports = function(deployer) {
  deployer.deploy(SecretBallot, ['John', 'Jeff', 'Jim'])
};
