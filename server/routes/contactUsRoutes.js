const express = require('express');
const router = express.Router();
const {sendEmailController} = require('../controllers/contactUsController');

router.post('/', sendEmailController);

module.exports = router;