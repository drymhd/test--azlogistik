const client = require("../db/connection");
const { query } = require("express-validator");
const merkRepository = require("../repositories/merkRepository");
const { make } = require("simple-body-validator");
const Exception = require("../helpers/exception");

const show = async (id) => {
  try {
    const data = await merkRepository.show(id);
    return data;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  const result = await merkRepository.getAll();
  return result;
};

const create = async (body) => {
  try {
    const rules = {
      name: "required|string|min:3",
      deskripsi: "required",
    };



    const validator = make(body, rules);

    if (!validator.stopOnFirstFailure().validate()) {
      throw new Exception(validator.errors().first(), 400);
    }


    const res = await merkRepository.create(body);

    return res;
  } catch (err) {
    throw err;
  }
};

const update = async (merk, body) => {
  try {


    const res = await merkRepository.update(merk, body);
       const rules = {
      name: "required|string|min:3",
      deskripsi: "required",
    };

    const validator = make(body, rules);

    if (!validator.stopOnFirstFailure().validate()) {
      throw new Exception(validator.errors().first(), 400);
    }

    return res;
  } catch (err) {
    throw err;
  }
};

const destroy = async (merk) => {
  try {
    const res = await merkRepository.destroy(merk);
    return res;
  } catch (err) {
    throw err;
  }
};

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

    const res = await merkRepository.pagination(query);
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
