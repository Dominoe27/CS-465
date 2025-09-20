// Dynamic travel page: load trips.json and pass it to the view.
const fs = require('fs');
const path = require('path');

let trips = [];
try {
  const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  trips = JSON.parse(raw);
} catch (err) {
  trips = []; // fail gracefully if file is missing/malformed
}

const travel = (req, res) => {
  res.render('travel', { title: 'Travel', trips, layout: 'layouts/layout' });
};

module.exports = { travel };
