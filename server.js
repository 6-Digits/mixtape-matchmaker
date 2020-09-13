const express = require("express");
const mongoose = require("mongoose");


const MONGO_URI = 27017;
const PORT  = 42069;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB database");
  });

  app.listen({ port: PORT }, () => {
    console.log(`Server running at port: ${PORT}`);
  });
