'use strict';

const express = require('express');
const router = express.Router();
const categorySchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categorySchema);

//Get all categories
router.get('', async (req, res, next) => {
  let results = await CategoriesModel.readByQuery({});
  res.send(results);
});

//Get one category
router.get('/:id', async (req, res, next) => {
  let record = await CategoriesModel.read(req.params.id);
  res.send(record);
});

//Create a category
router.get('', async (req, res, next) => {
  let createdRecord = await CategoriesModel.create(req.body);
  res.send(createdRecord);
});

//Update a category
router.get('/:id', async (req, res, next) => {
  let updatedRecord = await CategoriesModel.update(req.params.id, req.body);
  res.send(updatedRecord);
});

//Delete a category
router.get('/:id', async (req, res, next) => {
  let deletedRecord = await CategoriesModel.delete(req.params.id);
  res.send(deletedRecord);
});

module.exports = router;