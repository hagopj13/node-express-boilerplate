const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Resource = require('./resource.model');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    facebookId: {
      type: String,
      required: true,
      unique: true
    },
    facebookPageId: {
      type: String
    },
    instagramAccountId: {
      type: String
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    resource: {
      type: [Resource],
      default: []
    },
    address: String
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if facebookId is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.accountAlreadyExist = async function (facebookId, excludeUserId) {
  const user = await this.findOne({ facebookId, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  console.log("Before save logging : " + user.facebookId);
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
