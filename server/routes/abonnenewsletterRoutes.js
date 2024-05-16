const express = require('express');
const router = express.Router();
const abonnenewsletterController = require('../controllers/abonnenewsletterControllers');

router.get('/', abonnenewsletterController.getAll);
router.get('/:id', abonnenewsletterController.getById);
router.post('/', abonnenewsletterController.create);
router.put('/:id', abonnenewsletterController.update);
router.delete('/:id', abonnenewsletterController.delete);

module.exports = router;