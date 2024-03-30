const client = require("./connection");


const queryText =  `
    SELECT p.*, m.name as merk FROM products p 
    LEFT JOIN merks m ON p.merk_id = m.id
    WHERE p.price BETWEEN 100000 AND 200000
    AND p.stock >= 5
    ORDER BY p.price ASC
` ;


client.query(queryText, (err, res) => {
  if (err) {
    console.log(err.stack);
    process.exit(1);

  } else {
    console.log(res.rows);
    process.exit(1);
  }
})
