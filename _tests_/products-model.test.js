'use strict';

require('@code-fellows/supergoose');

const Products = require('../lib/models/products-schema');

describe('products model', () => {
  let products;

  beforeEach(() => {
    products = new Products();
  });

  it('can create a new product', async () => {
    const newProduct = {
      id: '7',
      category: 'organic vegetables',
      name: 'peppers',
      display_name: 'peppers',
      description: 'organic peppers from California',
    };
    const record = await products.create(newProduct);

    Object.keys(newProduct).forEach(key => {
      expect(newProduct[key]).toEqual(record[key]);
    });
  });


  it('can read a single entry', async () => {
    const newProduct = {
      id: '7',
      category: 'organic vegetables',
      name: 'peppers',
      display_name: 'organic peppers',
      description: 'organic peppers from California',
    };
    const productCreated = await products.create(newProduct);
    const readEntry = await products.read(productCreated._id);
    Object.keys(newProduct).forEach(key => {
      expect(newProduct[key]).toEqual(readEntry[0][key]);
    });
  });


  it('can read all entries', async () => {
    const newProduct = {
      id: '7',
      category: 'organic vegetables',
      name: 'peppers',
      display_name: 'organic peppers',
      description: 'organic peppers from California',
    };
    const secondProduct = {
      id: '6',
      category: 'organic vegetables',
      name: 'carrots',
      display_name: 'organic carrots',
      description: 'organic carrots from Yakima',
    };
    await products.create(newProduct);
    await products.create(secondProduct);
    const readEntries = await products.read();
    expect(readEntries.length > 2).toBeTruthy();
  });

  it('can delete an entry', async () => {
    const newProduct = {
      id: '7',
      category: 'organic vegetables',
      name: 'peppers',
      display_name: 'organic peppers',
      description: 'organic peppers from California'
    };
    const productCreated = await products.create(newProduct);

    await products.delete(productCreated._id);
    const readDeletedEntry = await products.read(productCreated._id);

    expect(readDeletedEntry).toEqual([]);

  });

  it('can update an entry', async () => {
    const newProduct = {
      id: '7',
      category: 'organic vegetables',
      name: 'peppers',
      display_name: 'organic peppers',
      description: 'organic peppers from California'
    };

    const updatedInfo = {
      id: '7',
      category: 'organic vegetables',
      name: 'green peppers',
      display_name: 'organic peppers',
      description: 'organic peppers from California'
    };

    const categoryCreated = await products.create(newProduct);
    const updatedProduct = await products.update(categoryCreated._id, updatedInfo);
    Object.keys(updatedInfo).forEach(key => {
      expect(updatedInfo[key]).toEqual(updatedProduct[key]);
    });
  });
});