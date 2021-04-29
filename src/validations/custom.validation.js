const axios = require('axios');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const facebookToken = (value, helpers) => {
  axios.get(`https://graph.facebook.com/v10.0/me?access_token=${value}`)
    .then(response => {
        const { data } = response;
        if (data.error) 
        {
          return helpers.message('invalid facebook access token');
        }});
  return value;
};

module.exports = {
  objectId,
  password,
  facebookToken
};
