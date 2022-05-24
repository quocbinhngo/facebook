const http = require("http");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const app = require("./app");

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
}

startServer();
