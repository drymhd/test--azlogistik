// Import Express
const express = require('express');
const router = express.Router();
const restapi = require('../helpers/restapi');
const merkController = require('../controllers/merkController');
// Middleware untuk v1
router.use((req, res, next) => {
  console.log('Middleware untuk v1');
  next();
});

router.get('/:id', merkController.show);
router.post('/', merkController.create);
router.put('/:id', merkController.update);
router.delete('/:id', merkController.destroy);

// Export router
module.exports = router;