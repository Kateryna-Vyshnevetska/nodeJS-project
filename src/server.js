const path = require('path');
require("dotenv").config({path: path.join(__dirname,"../.env") })
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { apiRouter } = require('./contacts/contacts.router');
const { authRouter } = require('./auth/auth.router');
const { usersRouter } = require('./users/users.router');

const PUBLIC_FILES_PATH = "src/public/images";
exports.ContactsServer = class {
  async start() {
    this.initServer();
    this.initMiddleWares();
    this.initRoutes();
    this.initErrors();
    this.startListening();
    await this.initDatabase();
  }

  initServer() {
    this.app = express();
  }

  initMiddleWares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/images', express.static(PUBLIC_FILES_PATH));
  }

  initRoutes() { 
    this.app.use('/api/contacts', apiRouter),
    this.app.use('/auth', authRouter)
    this.app.use('/users', usersRouter)
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

  async initDatabase() {
    try{
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      console.log("Database connection successful");
    }catch(err){
      console.log(err);
      process.exit(1);
    }
  }
}