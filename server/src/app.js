const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/usersRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    useSuccessStatus: 200,
  })
);
app.use(morgan("combined"));

app.use(express.json());

app.use("/users", userRouter);

module.exports = app;
