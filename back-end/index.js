const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running...`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const express = require("express");
  const helmet = require("helmet");
  const cors = require("cors");
  const PORT = 80;
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get("/api", (_, res) => {
    const msg = { status: `Server is running on ${totalCPUs} CPUs...` };
    res.json(msg);
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port: ${PORT}...`);
  });
}
