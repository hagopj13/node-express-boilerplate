const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
    },
  }
);

addressSchema.statics.addressAlreadyExist = async function (address) {
  const status = await this.findOne({ "value": address });
  return !!status;
};

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
