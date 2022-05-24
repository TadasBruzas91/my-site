const express = require("express");
const router = express.Router();
const SysInfoCurrent = require("../schemas/systemInfoSchemaCurrent");
const SysInfoHistory = require("../schemas/systemInfoSchemaHistory");

router.get("/current", async (req, res) => {
  const data = await SysInfoCurrent.find();
  res.json(data);
});

router.get("/history", async (req, res) => {
  const count = await SysInfoHistory.countDocuments();
  const sk = count > 720 ? count - 720 : 0;
  const data = await SysInfoHistory.find().skip(sk).select({
    cpu_load: true,
    cpu_freq: true,
    cpu_temp: true,
    ram_used_perc: true,
    createdAt: true,
  });
  res.json(data);
});

module.exports = router;
