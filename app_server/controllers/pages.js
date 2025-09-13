// app_server/controllers/pages.js
// Public site controllers. Each action renders an HBS view with a title.
// Using a single file keeps things tidy for static pages.

const index = (req, res) =>
  res.render('index', { title: 'Welcome to Travlr Getaways', layout: 'layouts/layout' });

const travel = (req, res) =>
  res.render('travel', { title: 'Travel', layout: 'layouts/layout' });

const about = (req, res) =>
  res.render('about', { title: 'About', layout: 'layouts/layout' });

const contact = (req, res) =>
  res.render('contact', { title: 'Contact', layout: 'layouts/layout' });

const meals = (req, res) =>
  res.render('meals', { title: 'Meals', layout: 'layouts/layout' });

const news = (req, res) =>
  res.render('news', { title: 'News', layout: 'layouts/layout' });

const rooms = (req, res) =>
  res.render('rooms', { title: 'Rooms', layout: 'layouts/layout' });

module.exports = { index, travel, about, contact, meals, news, rooms };