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
  storage: './tests.sqlite',
});

const Post = database.define('data', {
  name: Sequelize.STRING,
  body: Sequelize.TEXT,
  orgid:Sequelize.STRING
});

const connectData = database.define('connectData', {
  type: Sequelize.STRING,
  body: Sequelize.TEXT,
  orgid:Sequelize.STRING
});

finale.initialize({ app, sequelize: database });

finale.resource({
  model: Post,
  endpoints: ['/data', '/data/:id'],
  search: [
    {operator: Sequelize.Op.eq, param: 'orgid', attributes: [ 'orgid' ]},
  ] 
});
finale.resource({
  model: connectData,
  endpoints: ['/connectdata', '/connectdata/:id'],
  search: [
    {operator: Sequelize.Op.eq, param: 'orgid', attributes: [ 'orgid' ]},
  ]
});

app.use("/", require("./routes"));

const port = process.env.SERVER_PORT || 3072;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});