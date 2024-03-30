const client = require("../db/connection");
const Exception = require("../helpers/exception");

const getAll = async () => {
  const result = await client.query(`
  SELECT 
  m.*,
  json_agg(
    json_build_object(
      'id', p.id,
      'name', p.name,
      'price', p.price,
      'stock', p.stock,
      'deskripsi', p.deskripsi
    )
  ) as products
FROM merks m left join products p on m.id = p.merk_id
GROUP BY m.id`
);
  return result.rows;
};


const show = async (id) => {
  try {
    const { rows } = await client.query("SELECT * FROM merks WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Exception("Merk not found", 404);
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
    const { name, deskripsi } = body;
    const { rows } = await client.query(
      "INSERT INTO merks (name, deskripsi) VALUES ($1, $2) RETURNING *",
      [name, deskripsi]
    );
    return rows[0];
  } catch (err) {
    throw new Exception(err, 500);
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
    throw new Exception(err, 500);
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
    throw new Exception(err, 500);
  }
};


const pagination = async (query) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM merks WHERE name LIKE '%${query.search}%' OR deskripsi LIKE '%${query.search}%' LIMIT ${query.limit} OFFSET ${query.offset * query.limit}`
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