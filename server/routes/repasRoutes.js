const express = require('express');
const router = express.Router();
const repasController = require('../controllers/repasController');
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });
// Middleware to ensure CSRF token is passed
// router.use(csrfProtection);

router.get('/', repasController.getAll);
router.get('/:id', repasController.getById);
router.post('/', repasController.create);
router.put('/:id', repasController.update);
router.delete('/:id', repasController.delete);

router.post('/upload/:id', repasController.uploadImage);

module.exports = router;