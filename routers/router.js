const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const merk = require('./merk.js');
const product = require('./product.js');

const init = () => {
    
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

    
    // Gunakan router v1
    app.use('/merk', merk);
    app.use('/product', product);
    
    // Port untuk server
    const port = 3000;
    
    // Mulai server
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
}

module.exports = init;
// Import router v1