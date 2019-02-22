var SecretBallot = artifacts.require("SecretBallot");
module.exports = function(deployer) {
    deployer.deploy(SecretBallot, [
        web3.utils.fromAscii('John'),
        web3.utils.fromAscii('Jeff'),
        web3.utils.fromAscii('Jim'),
    ],
    {
        oasis: { confidential: true }
    });
};
