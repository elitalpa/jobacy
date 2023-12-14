const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require("../middleware/authMiddleware");

router.get('/myProfile', requireAuth, dashboardController.myProfile_get);
router.get('/dashboard', requireAuth, dashboardController.dashboard_get);
router.get('/addJob', requireAuth, dashboardController.addJob_get);
router.post('/addJob', requireAuth, dashboardController.addJob_post);
router.get('/job/:id', requireAuth, dashboardController.job_get);

module.exports = router;