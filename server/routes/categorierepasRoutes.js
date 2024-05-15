const express = require('express');
const router = express.Router();
const categorierepasController = require('../controllers/categorierepasControllers');

router.get('/', categorierepasController.getAll);
router.get('/:id', categorierepasController.getById);
router.post('/', categorierepasController.create);
router.put('/:id', categorierepasController.update);
router.delete('/:id', categorierepasController.delete);
// router.get('/catRepas/:id', categorierepasController.getallrepass);

module.exports = router;