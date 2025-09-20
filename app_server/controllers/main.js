// Home controller: render index.hbs with a page title.
const index = (req, res) => {
  res.render('index', { title: 'Welcome to Travlr Getaways', layout: 'layouts/layout' });
};

module.exports = { index };