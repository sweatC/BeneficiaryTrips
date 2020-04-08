require('dotenv').config();

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./db');

app.use(bodyParser.json());
const client = new MongoClient(db.url, { useNewUrlParser: true });
client.connect(err => {
  if (err) return console.log(err)
  require('./routes')(app, client.db(process.env.DB_NAME));
  app.listen(process.env.PORT, () => {
    console.log('We are live on ' + process.env.PORT);
  });
});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});
