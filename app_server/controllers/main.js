// app_server/controllers/main.js
// Controller for my home page.
// Handles "/" requests and renders index.hbs with a title.

const index = (req, res) => {
  res.render('index', { title: 'Welcome to Travlr Getaways' });
};
module.exports = { index };
