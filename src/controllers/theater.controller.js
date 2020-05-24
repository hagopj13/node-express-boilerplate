const httpStatus = require('http-status');
const { pick } = require('lodash');
const { Theater } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { theaterService } = require('../services');
const multer = require('multer');
const fs = require('file-system');
const logger = require('../config/logger');

const upload = multer({ dest: 'upload/' });


const getTheaterDetail = catchAsync(async (req, res) => {
  const theater = await theaterService.getTheaterById(req.params.id);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }
  res.send({ theater: theater });

});

const getTheaters = catchAsync(async (req, res) => {
  const query = pick(req.query, ['title', 'body']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const theaters = await theaterService.queryTheaters(query, options);

  res.send({ theaters: theaters });
});

const createTheater = catchAsync(async (req, res) => {
  const theater = await Theater.create(req.body);
  res.status(httpStatus.CREATED).send(theater);
});

const deleteTheater = catchAsync(async (req, res) => {
  const user = await Theater.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }
  await user.remove();
  res.status(httpStatus.NO_CONTENT).send();
});


const updateTheater = catchAsync(async (req, res) => {

  const theater = await Theater.findById(req.params.id);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }

  Object.assign(theater, req.body);
  await theater.save();
  res.send(theater);
});
const uploadImage = catchAsync(async (req, res) => {

  const theater = await Theater.findById(req.params.id);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }
  //console.log(req.file.filename);
  logger.info('Resim yüklendi');

  Object.assign(theater, { image: req.file.path });
  await theater.save();
  res.status(httpStatus.ACCEPTED).send({ theater: theater });
});

const deleteImage = catchAsync(async (req, res) => {

  const theater = await Theater.findById(req.params.id);
  if (!theater) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theater not found');
  }
  //console.log(req.file.filename);

  fs.fs.unlink( theater.image, (err) => {
    if (err) throw err;
    logger.info('Resim Silindi');
  });

  Object.assign(theater, { image: null });
  await theater.save();
  res.status(httpStatus.ACCEPTED).send({ theater: theater });
});

module.exports = {
  getTheaters,
  createTheater,
  deleteTheater,
  getTheaterDetail,
  updateTheater,
  uploadImage,
  deleteImage

};
