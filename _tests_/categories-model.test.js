const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');
const agent = supergoose(server.apiServer);
const schema = require('../models/categories-schema.js');
const modelObj = new Model();
modelObj.model = schema;

afterEach(async () => {
  await modelObj.model.deleteMany({}).exec();
})

describe('Database can create', () => {
  it('for best case', async () => {
    let response = await modelObj.create({
      note: 'buy apples',
      category: 'random',
    });
    console.log(response);

    expect(response).not.toBe(false);
    expect(response.note).toBe('buy apples');
  })
});

describe('Database can show all notes', () => {
  it('an existing record', async () => {
    let arg4 = await modelObj.create({
      note: 'buy oranges',
      category: 'random',
    });
    let arg5 = await modelObj.create({
      note: 'wash my car',
      category: 'random',
    });
    let arg6 = await modelObj.create({
      note: 'go to church',
      category: 'random',
    });
    let response = await modelObj.read();
    expect(response.length).toBe(3);
    expect(response[0].note).toEqual(arg4.note);
    expect(response[0].category).toEqual(arg4.category);
    expect(response[0]._id).toEqual(arg4._id);

    expect(response[1].note).toEqual(arg5.note);
    expect(response[1].category).toEqual(arg5.category);
    expect(response[1]._id).toEqual(arg5._id);

    expect(response[2].note).toEqual(arg6.note);
    expect(response[2].category).toEqual(arg6.category);
    expect(response[2]._id).toEqual(arg6._id);
  })
});

describe('Database can update', () => {
  it('for best case', async () => {
    let response = await modelObj.create({
      note: 'buy eggs',
      category: 'random',
    });
    let rawObject = {
      note: 'buy eggs',
      category: 'important',
    }
    let eggsId = response._id;
    let updatedRes = await modelObj.update(response._id, rawObject);
    let read = await modelObj.read();
    console.log(read)
    expect(updatedRes.category).toEqual(rawObject.category);
  })
});

describe('Database can delete', () => {
  it('an existing record', async () => {
    let arg3 = await modelObj.create({
      note: 'buy apples',
      category: 'random',
    });
    let response = await modelObj.read();
    expect(response.length).toBe(1);
    let appleId = response[0]._id;
    let delRecord = await modelObj.delete(appleId);
    expect(delRecord.note).toEqual(arg3.note);
    expect(delRecord.category).toEqual(arg3.category);
    expect(delRecord._id).toEqual(arg3._id);
  })
});