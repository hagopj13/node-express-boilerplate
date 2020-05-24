const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventScheme = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },

    start: {
      type: Date,
      required: true,
      trim: true
    },
    end  : {
      type    : Date,
      required: true,
      trim    : true
    },
    allDay  : {
      type    : Boolean,
      trim    : true
    },
    status   : {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toObject  : { getters: true },
    toJSON    : { getters: true }
  }
);

eventScheme.plugin(toJSON);
eventScheme.plugin(paginate);

const Event = mongoose.model('Event', eventScheme);

module.exports = Event;
