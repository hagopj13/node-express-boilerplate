const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { blockchainService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  // need BCB rpc client here
  // we call and get the whole shit
  // I am not going 
  const listOfAuctionData = await blockchainService.getAll();
  res.status(httpStatus.OK).send({ listOfAuctionData });
});

const getOne = catchAsync(async (req, res) => {
  // get auctionId
  let auctionId = 1;// get this from url itself somehow
  const auctionData = await blockchainService.getOne(auctionId);
  res.send({ auctionData });
});

const openAuction = catchAsync(async (req, res) => {
  // get reosurce_hash
  let resource_hash = 1;// get this from body itself somehow
  const auctionData = await blockchainService.openAuction(resource_hash);
  // we shuold send back auction Data for frontend to dsiplay
  res.send({ auctionData });
});

const finishAuction = catchAsync(async (req, res) => {
  // get auctionId
  let auctionId = 1;// get this from url itself somehow
  const auctionData = await blockchainService.finishAuction(auctionId);
  // here we also update status of resource_hash in mongo db 
  // hence user data is also updated
  res.send({ auctionData });
});

module.exports = {
  getAll,
  getOne,
  openAuction,
  finishAuction
};
