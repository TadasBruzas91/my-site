const cluster = require("cluster");
const totalCPUs = 1 || require("os").cpus().length;
const mongoose = require("mongoose");
const dataBaseUrl = process.env.DB_URL;
const workers = [];

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running...`);

  // Mongoose
  mongoose
    .connect(dataBaseUrl)
    .then(() => console.log("Master connected to mongodb."))
    .catch(() => console.log("Master can't connect to mongodb!"));

  // System monitor
  const HwInfo = require("./systemInfo");
  const hw = new HwInfo();
  setInterval(() => {
    hw.update();
  }, 5000);

  setTimeout(() => {
    for (let i = 0; i < totalCPUs; i++) {
      const worker = cluster.fork();
      workers.push(worker);
    }

    cluster.on("exit", (w) => {
      const index = workers.findIndex(worker.process.pid === w.process.pid);
      workers.slice(index, 1);
      const worker = cluster.fork();
      workers.push(worker);
    });
  }, 1000);
} else {
  const express = require("express");
  const helmet = require("helmet");
  const cors = require("cors");
  const PORT = process.env.PORT || 80;
  const app = express();
  const hwInfo = require("./routes/sysInfo");

  mongoose
    .connect(dataBaseUrl)
    .then(() => console.log(`Worker id ${process.pid} connected to mongodb.`))
    .catch(() =>
      console.log(`Worker id ${process.pid} can't connect to mongodb!`)
    );

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use("/hwinfo", hwInfo);

  app.get("/", (_, res) => {
    const msg = { status: `Server is running on ${totalCPUs} CPUs...` };
    res.json(msg);
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port: ${PORT}...`);
  });
}
