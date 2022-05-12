const express = require("express");
const router = express.Router();
const HwInfo = require("../systemInfo");

const hw = new HwInfo();

setInterval(hw.update, 5000);

router.get("/", (req, res) => {
  res.json(hw.getHwInfo());
});

module.exports = router;
