// Public routes: clean split between home, dynamic travel, and static pages.
const express = require('express');
const router = express.Router();

const mainCtrl   = require('../controllers/main');
const travelCtrl = require('../controllers/travel');
const pagesCtrl  = require('../controllers/pages');

router.get('/', mainCtrl.index);          // home
router.get('/travel', travelCtrl.travel); // dynamic (JSON-backed)

router.get('/about', pagesCtrl.about);
router.get('/contact', pagesCtrl.contact);
router.get('/meals', pagesCtrl.meals);
router.get('/news', pagesCtrl.news);
router.get('/rooms', pagesCtrl.rooms);

module.exports = router;