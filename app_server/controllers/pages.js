// Static pages only. Keep dynamic data out of here.
const about = (req, res) =>
  res.render('about', {
    title: 'About Travlr Getaways',
    layout: 'layouts/layout',

    // short, useful copy for the page
    tagline: 'Small team. Big adventures.',
    mission:
      'We plan dive trips that are safe, transparent on pricing, and unforgettable. No fluff—just solid logistics and great water.',

    // bullets rendered in the view
    values: [
      { k: 'Safety first', v: 'Professional guides, vetted partners.' },
      { k: 'Transparent pricing', v: 'Clear inclusions. No junk fees.' },
      { k: 'Local respect', v: 'We partner locally and protect reefs.' }
    ],

    crewNote:
      'Our crew is a tight group of trip leads, ops, and customer care who actually dive the itineraries we recommend.'
  });

const contact = (req, res) =>
  res.render('contact', { title: 'Contact', layout: 'layouts/layout' });

const meals = (req, res) =>
  res.render('meals', { title: 'Meals', layout: 'layouts/layout' });

const news = (req, res) =>
  res.render('news', { title: 'News', layout: 'layouts/layout' });

const rooms = (req, res) =>
  res.render('rooms', { title: 'Rooms', layout: 'layouts/layout' });

module.exports = { about, contact, meals, news, rooms };