const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth} = require("../middleware/authMiddleware");

router.get('/', requireAuth, dashboardController.dashboard_get);
router.get('/home', requireAuth, dashboardController.dashboard_get);
router.get('/myProfile', requireAuth, dashboardController.myProfile_get);
router.get('/addJob', requireAuth, dashboardController.addJob_get);
router.post('/addJob', requireAuth, dashboardController.addJob_post);

module.exports = router;