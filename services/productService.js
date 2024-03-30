const client = require("../db/connection");
const { query } = require('express-validator');
const productRepository = require("../repositories/productRepository");

const show = async (id) => {
  try {
        const data = await productRepository.show(id);
        return data;
  } catch (err) {
    throw new Error(err);
  }
};


const create = async (body) => {
  try {
    const res = await productRepository.create(body);
    
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (merk, body) => {
  try {

    const res = await productRepository.update(merk, body);
    return res;

  } catch (err) {
    throw new Error(err);
  }
}

const destroy = async (merk) => {
  try {
    const res = await productRepository.destroy(merk);
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