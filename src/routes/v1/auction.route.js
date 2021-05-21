const express = require('express');
const validate = require('../../middlewares/validate');
const auctionController = require('../../controllers/auction.controller');

const router = express.Router();

// add validation later or something
router.get('/', auctionController.getAll);
router.post('/open', auctionController.openAuction);
router.get('/:auctionId', auctionController.getOne);
router.post('/:auctionId/finish', auctionController.finishAuction);

module.exports = router;