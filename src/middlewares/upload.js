const multer = require('multer');
const randomstring = require('randomstring');
const config = require('../config/config');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.folder.public);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    let prependString = null;
    if (config.file.prependUploadFilenameMethod === 'random_string') {
      prependString = randomstring.generate({ 
        length: config.file.randomStringLength, 
        charset: 'alphanumeric' 
      });
    }
    if (config.file.prependUploadFilenameMethod === 'millisecond') {
      prependString = Date.now();
    }
    if (prependString) {
      fileName = prependString + '-' + fileName;
    }
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: config.file.maxUploadSize },
  fileFilter: (req, file, cb) => {
    const arrFileType = config.file.allowUploadFileType.split(',');
    if (arrFileType.find((type) => type === file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      let arrMimeType = arrFileType.map((fileType => {
        return fileType.split('/')[1];
      }));
      return cb(new ApiError(httpStatus.BAD_REQUEST, `Only ${arrMimeType.join(', ')} file is allowed!`));
    }
  }
});

module.exports = upload;