const express = require("express");
const listEndPoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./route/user/index");

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT;

server.use("/chanel", UserRouter);

console.log(listEndPoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`The application it's running on port:${port}`);
    })
  );
