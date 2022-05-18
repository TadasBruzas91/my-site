const express = require("express");
const router = express.Router();

let data = null;

process.on("message", (msg) => {
  data = msg.data;
});

router.get("/", async (req, res) => {
  res.json(data);
});

module.exports = router;
