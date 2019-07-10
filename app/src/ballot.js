import oasis from 'client';
import ballot_artifacts from '../../build/contracts/SecretBallot.json';

// temporary
import truffleConfig from '../truffle-config.js';

const coder = new oasis.utils.EthereumCoder();

const gateway = new oasis.gateways.Web3Gateway(
  'wss://localhost:8546',
  oasis.Wallet.fromMneumonic(truffleConfig.MNEUMONIC),
)

oasis.setGateway(gateway);

const service = await oasis.deploy({
  idl: ballot_artifacts.abi,
  bytecode: ballot_artifacts.bytecode,
  arguments: [],
  header: { confidential: false },
  coder,
});
