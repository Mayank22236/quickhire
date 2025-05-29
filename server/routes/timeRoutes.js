const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { logTime, getTimeLogs } = require('../controllers/timeController');

router.post('/', auth, logTime);
router.get('/', auth, getTimeLogs);

module.exports = router;