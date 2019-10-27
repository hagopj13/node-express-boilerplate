const Joi = require('@hapi/joi');

const register = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          return helpers.message('Password must contain at least one letter and one number');
        }
        return value;
      }),
    name: Joi.string().required(),
  }),
};

module.exports = {
  register,
};
