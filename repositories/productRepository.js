const client = require("../db/connection");

const show = async (id) => {
  try {
    const { rows } = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error("Product tidak ditemukan");
    }

    return rows[0];
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
  }
};

const get = async () => {
  const result = await client.query("SELECT * FROM products");
  return result.rows;
};

const update = async (merk, body) => {
  try {
    const { name, deskripsi } = body;
    const { rows } = await client.query(
      "UPDATE products SET name = $1, deskripsi = $2 WHERE id = $3 RETURNING *",
      [name, deskripsi, merk.id]
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
  }
};

module.exports = {
  show,
  create,
  get,
  update,
  destroy
}