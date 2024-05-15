const express = require('express');
const router = express.Router();
const abonnenewsletterController = require('../controllers/abonnenewsletterControllers');
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });
// Middleware to ensure CSRF token is passed
// router.use(csrfProtection);

router.get('/', abonnenewsletterController.getAll);
router.get('/:id', abonnenewsletterController.getById);
router.post('/', abonnenewsletterController.create);
router.put('/:id', abonnenewsletterController.update);
router.delete('/:id', abonnenewsletterController.delete);

module.exports = router;