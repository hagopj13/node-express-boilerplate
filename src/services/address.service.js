const { Address } = require('../models');
const addressList = require('../config/addressList');

const seedAddress = async () => {
  console.log("seeding address");
  for (let index = 0; index < addressList.addressList.length; index++) {
    let element = addressList.addressList[index];
    let status = await Address.addressAlreadyExist(element.address);
    if (!status) {
      Address.insertMany([{
        "name": element.name,
        "value": element.address,
        "status": false
      }]).then(res => console.log("success")).catch(err => console.log("error"));
    }
  }
}

const getAddress = async () => {
  // only works for first 8 registrations.
  // post that the dev address gets over
  return Address.findOne({ status: false });
}

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
  seedAddress,
  getAddress,
  getAll,
  getOne,
  openAuction,
  finishAuction,
};
