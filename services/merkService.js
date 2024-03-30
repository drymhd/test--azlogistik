const client = require("../db/connection");
const { query } = require('express-validator');
const merkRepository = require("../repositories/merkRepository");
const { make } = require('simple-body-validator');

const show = async (id) => {
  try {
        const data = await merkRepository.show(id);
        return data;
  } catch (err) {
    throw new Error(err);
  }
};


const create = async (body) => {
  try {

    const rules = {
      name: 'required|string|min:3',
      email: 'required|email',
      age: 'min:18'
  };

  const validator = make(data, rules);
  if (!validator.passes()) {
    throw new Error(validator.errors);
  }
    
    const res = await merkRepository.create(body);
    
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (merk, body) => {
  try {

    const res = await merkRepository.update(merk, body);
    return res;

  } catch (err) {
    throw new Error(err);
  }
}

const destroy = async (merk) => {
  try {
    const res = await merkRepository.destroy(merk);
    return res;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  show,
  create,
  update,
  destroy
};