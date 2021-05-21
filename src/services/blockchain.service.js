const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');

// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });

const createPair = async () => {
  await cryptoWaitReady();
  // create a keyring with some non-default values specified
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
  // generate a mnemonic with default params (we can pass the number
  // of words required 12, 15, 18, 21 or 24, less than 12 words, while
  // valid, is not supported since it is more-easily crackable)
  const mnemonic = mnemonicGenerate(12);
  // create & add the pair to the keyring with the type and some additional
  // metadata specified
  const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');
  return { pair, mnemonic };
};

const getAll = async () => {
  // Do something
  console.log(api.genesisHash.toHex());
  // call into rpc and return all shit
}

const getOne = async (auctionId) => {
  // call into rpc and return all shit
}

const openAuction = async (resource_hash) => {
  // call into rpc and return all shit
}

const finishAuction = async (auctionId) => {
  // call into rpc and return all shit
}

// create central account
// open bid foe a resource, accountId and initial amount
module.exports = {
  createPair,
  getAll,
  getOne,
  openAuction,
  finishAuction,
};
