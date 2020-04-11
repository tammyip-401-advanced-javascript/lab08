
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

//Get all products
router.get('', async (req, res, next) => {
  let results = await ProductsModel.readByQuery({});

  res.send(results);
});

//Get one product
router.get('/:id', async (req, res, next) => {
  let record = await ProductsModel.read(req.params.id);
  res.send(record);
});

//Create a product
router.get('/:id', async (req, res, next) => {
  let createdRecord = await ProductsModel.create(req.body);
  res.send(createdRecord);
});

//Update a product
router.get('/:id', async (req, res, next) => {
  let updatedRecord = await ProductsModel.update(req.params.id, req.body);
  res.send(updatedRecord);
});

//Delete a product
router.get('/:id', async (req, res, next) => {
  let deletedRecord = await ProductsModel.delete(req.params.id);
  res.send(deletedRecord);
});

module.exports = router;