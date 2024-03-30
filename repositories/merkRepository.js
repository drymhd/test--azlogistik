const client = require("../db/connection");

const show = async (id) => {
  try {
    const { rows } = await client.query("SELECT * FROM merks WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error("Merk tidak ditemukan");
    }

    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};


const create = async (body) => {
  try {
    const { name, deskripsi } = body;
    const { rows } = await client.query(
      "INSERT INTO merks (name, deskripsi) VALUES ($1, $2) RETURNING *",
      [name, deskripsi]
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const get = async () => {
  const result = await client.query("SELECT * FROM merks");
  return result.rows;
};

const update = async (merk, body) => {
  try {
    const { name, deskripsi } = body;
    const { rows } = await client.query(
      "UPDATE merks SET name = $1, deskripsi = $2 WHERE id = $3 RETURNING *",
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
      "DELETE FROM merks WHERE id = $1 RETURNING *",
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