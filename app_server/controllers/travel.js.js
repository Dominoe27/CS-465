// app_server/controllers/travel.js
// Controller for my travel page.
// Handles "/travel" requests and renders travel.hbs with a title.

const travel = (req, res) => {
  res.render('travel', { title: 'Travel' });
};
module.exports = { travel };