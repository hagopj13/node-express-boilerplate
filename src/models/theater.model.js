const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const theaterSchema = mongoose.Schema(
  {
    title: {
      type    : String,
      required: true,
      trim    : true
    },
    body : {
      type    : String,
      required: true,
      trim    : true
    },
    image: {
      type    : String,
    },
    tags : {
      type: Array
    }
  },
  {
    timestamps: true,
    toObject  : { getters: true },
    toJSON    : { getters: true }
  }
);

theaterSchema.plugin(toJSON);
theaterSchema.plugin(paginate);

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
