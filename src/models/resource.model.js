const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { states } = require('../config/resourceStates');
const resourceSchema = mongoose.Schema(
  {
    resourceUrl: {
      type: String,
      required: true,
      index: true,
    },
    state:{
      type: String,
      enum: states,
      default: 'imported',
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
resourceSchema.plugin(toJSON);

/**
 * @typedef Resource

const Resource = mongoose.model('Resource', resourceSchema);
 */
module.exports = resourceSchema;
