const express = require('express');
const router = express.Router();

const employeController = require('../controllers/employeController');


router.get('/', employeController.getAll);
router.get('/:id', employeController.getById);
router.post('/', employeController.create);
router.put('/:id', employeController.update);
router.delete('/:id', employeController.delete);

router.post('/upload/:id', employeController.uploadImage);

module.exports = router;