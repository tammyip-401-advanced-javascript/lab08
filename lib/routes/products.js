
'use strict';

const express = require('express');
const router = express.Router();
const productSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductsModel = new Model(productSchema);

/**
 * This route gives us all the products
 * @route GET /products
 * @group products
 * @returns {array} 200 - A list of records that are in the products collection
 */
router.get('', async (req, res, next) => {
  let results = await ProductsModel.readByQuery({});

  res.send(results);
});

router.get('/:id', async (req, res, next) => {
  let record = await ProductsModel.read(req.params.id);
  res.send(record);
});

module.exports = router;