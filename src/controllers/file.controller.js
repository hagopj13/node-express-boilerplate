const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const middlewareUpload = require('../middlewares/upload');
const config = require('../config/config');

const upload = catchAsync(async (req, res, next) => {
  middlewareUpload.single('fileName')(req, res, (err) => {
    if (!err) {
      if (req.file) {
        res.status(httpStatus.OK).send(`File is saved!`);
      } else { // there was no file being uploaded
        res.status(httpStatus.BAD_REQUEST).send('Please select a file to upload!');
      }
    } else {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        let message = err.message;
        // other error message from Multer can be used.
        if (err.code === 'LIMIT_FILE_SIZE') {
          message = `Maximum file size is ${config.file.maxUploadSize/(1024 * 1024)}MB`;
        }
        res.status(httpStatus.BAD_REQUEST).send(message);
      } else {
        // An unknown error occurred when uploading.
        res.status(err.statusCode?err.statusCode:httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
      }      
    }
  });
});

module.exports = {
  upload,
};
