const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'DaryMahdi99',
  port: 5435,
});

client.connect()
  .then(() => console.log('Koneksi ke database berhasil'))
  .catch(err => console.error('Koneksi gagal:', err.stack));

module.exports = client;