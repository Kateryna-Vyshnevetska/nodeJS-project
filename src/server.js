const express = require('express');
const morgan = require('morgan');
const path = require('path');
require("dotenv").config({path: path.join(__dirname,"../.env") })
const cors = require('cors');
const { apiRouter } = require('./router');

exports.ContactsServer = class {
  start() {
    this.initServer();
    this.initMiddleWares();
    this.initRoutes();
    this.initErrors();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleWares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  initRoutes() { 
    this.app.use('/api/contacts', apiRouter)
  }
  
  initErrors() {
    this.app.use((err,req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message)
    })
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log('Server started listening on port', PORT);
    })
  }
}