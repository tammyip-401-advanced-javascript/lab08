'use strict';

const express = require('express');
const router = express.Router();
const categorySchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categorySchema);

router.get('', async (req, res, next) => {
  let results = await CategoriesModel.readByQuery({});

  res.send(results);
});

router.get('/:id', async (req, res, next) => {
  let record = await CategoriesModel.read(req.params.id);
  res.send(record);
});

module.exports = router;