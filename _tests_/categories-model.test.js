'use strict';

require('@code-fellows/supergoose');

const Categories = require('../lib/models/categories-schema.js')

describe('categories model', () => {
  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  it('can create a new category', async () => {
    const newCategory = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from PNW',
    };
    const record = await categories.create(newCategory);

    Object.keys(newCategory).forEach(key => {
      expect(newCategory[key]).toEqual(record[key]);
    });
  });


  it('can read a single entry', async () => {
    const newCategory = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from PNW',
    };
    const categoryCreated = await categories.create(newCategory);
    const readEntry = await categories.read(categoryCreated._id);
    Object.keys(newCategory).forEach(key => {
      expect(newCategory[key]).toEqual(readEntry[0][key]);
    });
  });


  it('can read all entries', async () => {
    const newCategory = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from PNW',
    };
    const secondCategory = {
      id: '3',
      name: 'organic vegetables',
      display_name: 'organic vegetables',
      description: 'veggies from local organic farms',
    };
    await categories.create(newCategory);
    await categories.create(secondCategory);
    const readEntries = await categories.read();
    expect(readEntries.length > 2).toBeTruthy();
  });

  it('can delete an entry', async () => {
    const newCategory = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from PNW',
    };
    const categoryCreated = await categories.create(newCategory);

    await categories.delete(categoryCreated._id);
    const readDeletedEntry = await categories.read(categoryCreated._id);

    expect(readDeletedEntry).toEqual([]);

  });

  it('can update an entry', async () => {
    const newCategory = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from PNW',
    };

    const updatedInfo = {
      id: '4',
      name: 'seafood',
      display_name: 'seafood',
      description: 'fresh seafood from Alaska',
    };

    const categoryCreated = await categories.create(newCategory);
    const updatedCategory = await categories.update(categoryCreated._id, updatedInfo);
    Object.keys(updatedInfo).forEach(key => {
      expect(updatedInfo[key]).toEqual(updatedCategory[key]);
    });
  });
});