const mongoose = require("mongoose");

const SysInfoCurrent = mongoose.model(
  "SystemInformationCurrent",
  new mongoose.Schema({
    currentData: [
      {
        _id: Number,
        name: String,
        current: Number,
        min: Number,
        max: Number,
        label: String,
        symbol: String,
      },
    ],
  })
);

module.exports = SysInfoCurrent;
