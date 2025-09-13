// app_server/routes/index.js
const express = require('express');
const router = express.Router();
const pages = require('../controllers/pages');

// Home + Travel
router.get('/', pages.index);
router.get('/travel', pages.travel);

// New pages
router.get('/about', pages.about);
router.get('/contact', pages.contact);
router.get('/meals', pages.meals);
router.get('/news', pages.news);
router.get('/rooms', pages.rooms);

module.exports = router;