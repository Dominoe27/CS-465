// Static pages only. Keep dynamic data out of here.
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

module.exports = { about, contact, meals, news, rooms };
