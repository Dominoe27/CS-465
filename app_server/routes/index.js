// app_server/routes/index.js
// This is where I define my routes and hook them to the right controllers.

const express = require('express');
const router = express.Router();

const mainCtrl = require('../controllers/main');
const travelCtrl = require('../controllers/travel');

// home route
router.get('/', mainCtrl.index);

// travel route
router.get('/travel', travelCtrl.travel);

module.exports = router;
