const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { requireAuth, checkJob, checkUser } = require('../middleware/authMiddleware');
const { isAuth } = require("../middleware/authMiddleware");

router.get('/', checkUser, mainController.homepage);

module.exports = router;