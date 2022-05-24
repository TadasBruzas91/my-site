const mongoose = require("mongoose");

const SysInfoHistory = mongoose.model(
  "SystemInformationHistory",
  new mongoose.Schema(
    {
      cpu_load: Number,
      cpu_freq: Number,
      cpu_temp: Number,
      ram_used: Number,
      ram_used_perc: Number,
    },
    { timestamps: true }
  )
);

module.exports = SysInfoHistory;
