const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getDoctors);

module.exports = router;
