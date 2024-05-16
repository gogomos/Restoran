const express = require('express');
const router = express.Router();
const repasController = require('../controllers/repasController');
// const validate = require('../middleware/validate');

router.get('/', repasController.getAll);
router.get('/:id', repasController.getById);
router.post('/', repasController.create);
router.put('/:id', repasController.update);
router.delete('/:id', repasController.delete);

router.post('/upload/:id', repasController.uploadImage);

module.exports = router;