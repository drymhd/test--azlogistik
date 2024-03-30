const client = require("../db/connection");
const { query } = require('express-validator');
const productRepository = require("../repositories/productRepository");
const { make } = require("simple-body-validator");
const Exception = require("../helpers/exception");

const getAll = async () => {
  const result = await productRepository.getAll();
  return result;
};

const show = async (id) => {
  try {
        const data = await productRepository.show(id);
        return data;
  } catch (err) {
    throw err;
  }
};




const create = async (body) => {
  try {

    const rules = {
      name: "required|string|min:3",
      deskripsi: "required",
      stock: "required",
      price: "required|numeric",
      merk_id: "required",
    };

    const validator = make(body, rules);
    if(!validator.stopOnFirstFailure().validate()) {
      throw new Exception(validator.errors().first(), 400);
    }

    const res = await productRepository.create(body);
    
    return res;
  } catch (err) {
    throw err;
  }
};

const update = async (merk, body) => {
  try {
    const merkExist = await productRepository.show(merk.id);
    
    const rules = {
      name: "required|string|min:3",
      deskripsi: "required",
      stock: "required",
      price: "required|numeric",
      merk_id: "required",
    };

    const validator = make(body, rules);
    if(!validator.stopOnFirstFailure().validate()) {
      throw new Exception(validator.errors().first(), 400);
    }

    const res = await productRepository.update(merk, body);
    return res;

  } catch (err) {
    throw err;
  }
}

const destroy = async (merk) => {
  try {
    const res = await productRepository.destroy(merk);
    return res;
  } catch (err) {
    throw err;
  }
}

const pagination = async (query) => {
  try {
       const rules = {
          limit: "required",
          offset: "required",
        };

    const validator = make(query, rules);

    if (!validator.stopOnFirstFailure().validate()) {
      throw new Exception(validator.errors().first(), 400);
    }

    const res = await productRepository.pagination(query);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  show,
  create,
  update,
  destroy,
  getAll,
  pagination
};