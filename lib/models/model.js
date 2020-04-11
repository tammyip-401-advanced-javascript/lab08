'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  // verify that id is a valid id
  // findOne with that id
  async read(_id) {
    let record = await this.schema.findOne({ _id });
    return record;
  }

  async readByQuery(query) {
    let results = await this.schema.find(query);
    return results;
  }

  async update(id, record) {
    return this.schema.findByIdAndUpdate(id, record, { new: true });
  }

  async delete(id) {
    return this.schema.findOneAndDelete(id);
  }
}

module.exports = Model;