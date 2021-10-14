require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const finale = require('finale-rest');



const app = express();
app.use(cors());
app.use(bodyParser.json());



const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
});

const Post = database.define('data', {
  name: Sequelize.STRING,
  body: Sequelize.TEXT,
});

const connectData = database.define('connectData', {
  type: Sequelize.STRING,
  body: Sequelize.TEXT,
});

finale.initialize({ app, sequelize: database });

finale.resource({
  model: Post,
  endpoints: ['/data', '/data/:id'],
});
finale.resource({
  model: connectData,
  endpoints: ['/connectdata', '/connectdata/:id'],
});

app.use("/", require("./routes"));

const port = process.env.SERVER_PORT || 3072;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});