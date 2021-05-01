const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');

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

// create central account
// open bid foe a resource, accountId and initial amount
module.exports = {
  createPair,
};
