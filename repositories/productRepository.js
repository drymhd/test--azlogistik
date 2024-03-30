const client = require("../db/connection");
const Exception = require("../helpers/exception");


const getAll = async () => {
  const result = await client.query(`
  SELECT 
  p.*,
  m.name as merk
FROM products p left join merks m on p.merk_id = m.id`
);
  return result.rows;
};

const show = async (id) => {
  try {
    const { rows } = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Exception("Product not found", 404);
    }

    return rows[0];
  } catch (err) {
    if(err instanceof Exception) {
      throw err;
    }
    throw new Exception(err, 500);
  }
};


const create = async (body) => {
  try {
    const { name, price, stock ,deskripsi, merk_id } = body;
    const { rows } = await client.query(
      "INSERT INTO products (name, price, stock ,deskripsi, merk_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, stock, deskripsi, merk_id]
    );
    return rows[0];
  } catch (err) {
    throw new Exception(err, 500);
  }
};

const get = async () => {
  const result = await client.query("SELECT * FROM products");
  return result.rows;
};

const update = async (merk, body) => {
  try {
    const { name, price, stock, deskripsi, merk_id } = body;
    const { rows } = await client.query(
      "UPDATE products SET name = $1, price = $2, stock = $3, deskripsi = $4, merk_id = $5 WHERE id = $6 RETURNING *",
      [name, price, stock, deskripsi, merk_id, merk.id]
    );
    return rows[0];
  } catch (err) {
    throw new Exception(err, 500);
  }
};


const destroy = async (merk) => {
  try {
    const { rows } = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [merk.id]
    );
    return rows[0];
  } catch (err) {
    throw new Exception(err, 500);
  }
};

const pagination = async (query) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM products WHERE name LIKE '%${query.search}%' LIMIT ${query.limit} OFFSET ${query.offset * query.limit}`
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  show,
  create,
  get,
  update,
  destroy,
  getAll,
  pagination
}