const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport(config.email.transport);
transporter.verify().catch(error => {
  logger.warn(`Could not connect to SMTP service: ${error.message}`);
  logger.warn('The app will not be able to send emails');
});

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transporter.sendMail(msg);
};

module.exports = {
  transporter,
  sendEmail,
};
