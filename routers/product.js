// Import Express
const express = require('express');
const router = express.Router();
const restapi = require('../helpers/restapi');
const productController = require('../controllers/productController');
// Middleware untuk v1
router.use((req, res, next) => {
  console.log('Middleware untuk v1');
  next();
});

router.get('/', productController.getAll);
router.get('/:id', productController.show);
router.post('/pagination', productController.pagination);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);

// Export router
module.exports = router;