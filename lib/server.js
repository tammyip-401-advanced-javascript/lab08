'use strict';

const express = require('express');
const generateSwagger = require('../docs/swagger.js');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const categoryRouter = require('./routes/categories-routes.js');
const productRouter = require('./routes/products-routes.js');

const app = express();

const startServer = (port, mongodb) => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongodb, options);

  app.listen(port, () => {
    console.log('Server is up and running at port', port);
  });
};

generateSwagger(app);

app.use(cors());
app.use(morgan('dev'));

/**
 * This route give us a standard Homepage message
 * @route GET /
 * @group Non-API
 * @returns {string} 200 - The string "Homepage"
 */
app.get('', (req, res, next) => {
  res.send('This is my homepage');
});

app.use('/categories', categoryRouter);
app.use('/products', productRouter);

module.exports = {
  server: app,
  start: startServer,
};