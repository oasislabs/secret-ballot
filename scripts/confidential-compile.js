#!/usr/bin/env node

const fs = require('fs');
const compile = require('truffle-compile');
const Resolver = require('truffle-resolver');

function main() {

  makeDirIfNeeded(__dirname + "/build/");

  compile.all(compileConfig(), (err, contracts) => {
    if (err) {
      console.error("Could not compile contracts: " + err);
      return;
    }
    Object.keys(contracts).forEach((contractName) => {
      let contract = contracts[contractName];
      if (isConfidentialFilename(contract.sourcePath)) {
        contract = confidentialCompile(contract);
      }
      contract = sanitize(contract);
      write(contract);
    });
  });
}

function makeDirIfNeeded(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function compileConfig() {
  return {
    resolver: new Resolver({
      working_directory: __dirname,
      contracts_directory: __dirname + "/../contracts/",
      contracts_build_directory: __dirname + "/../build/contracts/",
    }),
    working_directory: __dirname,
    contracts_directory: __dirname + "/../contracts/",
    quiet: true,
    strict: false,
    paths: __dirname + "/../contracts/",
    solc: true,
  }
}

/**
 * @return true if a the filename is prepended with confidential_*.
 * @param  {String} sourcePath is a path of the form /dir1/dir2/.../contract.sol"
 */
function isConfidentialFilename(sourcePath) {
  let components = sourcePath.split("/");
  components = components[components.length-1].split("_");
  return components.length > 0 && components[0] === 'confidential';
}

/**
 * @returns a contract artifact where the bytecode is prepended with the
 *          confidential prefix.
 * @param   {Object} contract is a contract artifact, i.e., the output of truffle
 *          compile.
 */
function confidentialCompile(contract) {

  console.log(`Compiling ${contract.contract_name} as confidential...`);

  contract.bytecode = "0x00707269" + contract.bytecode.substr(2);
  contract.deployedBytecode = "0x00707269" + contract.deployedBytecode.substr(2);

  return contract;
}

/**
 * Mutates the given compiled contract, removing unecessary properties so that
 * truffle's external compilation validates properly.
 */
function sanitize(contract) {
  contract.contractName = contract.contract_name;
  // delete so truffle doesn't complain about additional data
  delete contract.contract_name;
  delete contract.unlinked_binary;

  return contract;
}

function write(contract) {
  const filename = __dirname + "/build/" + contract.contractName + ".json";
  fs.writeFile(filename, JSON.stringify(contract, null, 2), function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

main();
