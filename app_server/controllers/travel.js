// app_server/controllers/travel.js
// Dynamic travel page: fetch trips from the API and render the view.

const buildApiUrl = (req, path) => `${req.protocol}://${req.get('host')}${path}`;

const travel = async (req, res) => {
  try {
    // pull from our own API so the page stays in sync with the database
    const url = buildApiUrl(req, '/api/trips');
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!resp.ok) {
      return res.status(resp.status).render('travel', {
        title: 'Travel',
        trips: [],
        message: 'Could not load trips from the API.',
        layout: 'layouts/layout'
      });
    }

    const trips = await resp.json();
    const isArray = Array.isArray(trips);

    res.render('travel', {
      title: 'Travel',
      trips: isArray ? trips : [],
      message: isArray && trips.length === 0 ? 'No trips exist in the database.' : null,
      layout: 'layouts/layout'
    });
  } catch (err) {
    // fail safe for network or JSON issues
    res.status(500).render('travel', {
      title: 'Travel',
      trips: [],
      message: 'Unexpected error loading trips.',
      layout: 'layouts/layout'
    });
  }
};

module.exports = { travel };