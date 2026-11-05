/*
 * ─────────────────────────────────────────────────────────────
 *  SETTINGS — the only file you need to edit (besides your data).
 *  See README.md for step-by-step instructions.
 * ─────────────────────────────────────────────────────────────
 */
window.TRIP_CONFIG = {
  // Shown at the top of the page and in the browser tab.
  title: 'Japan Road Trip — Our Picks',
  subtitle: 'Our favourite places, sorted by area and type. Tap a pin or a place for details.',

  // 1) Paste your Google Maps API key between the quotes (README → "Step 1").
  googleMapsApiKey: 'AIzaSyCN7FIZXtOPoDHG0L9_rBLTBpMVrtHO5xg',

  // Leave as DEMO_MAP_ID unless you create your own Map ID in Google Cloud.
  mapId: 'DEMO_MAP_ID',

  // Map labels in English, results biased to Japan.
  language: 'en',
  region: 'JP',

  // 2) Where your lists live. These can be files in this repo (default)
  //    or "Publish to web → CSV" links from a Google Sheet (README → "Step 3").
  data: {
    // Published tabs of the Google Sheet "Japan road-trip map — places for Cass".
    places: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZaOpyinTJEWG3z1H113RWQzWNvk3y_pu94R0YfTHqfKoaL5jt2wC9T0j_LCr73Ll0XlEwKP9KO0as/pub?single=true&output=csv&gid=0', // Places tab
    areas: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZaOpyinTJEWG3z1H113RWQzWNvk3y_pu94R0YfTHqfKoaL5jt2wC9T0j_LCr73Ll0XlEwKP9KO0as/pub?single=true&output=csv&gid=1',  // Areas tab
    routes: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZaOpyinTJEWG3z1H113RWQzWNvk3y_pu94R0YfTHqfKoaL5jt2wC9T0j_LCr73Ll0XlEwKP9KO0as/pub?single=true&output=csv&gid=2', // Routes tab (scenic drives)
  },

  // Heading for your personal notes inside each place's pop-up.
  notesLabel: 'Our tips',

  // If a place has a place_id but no photo of your own, show Google's photo.
  useGooglePhotos: true,

  // Show a one-time "best on tablet/computer" tip on phones.
  showDeviceTip: true,

  // Categories: order here = order of the filter buttons.
  // Any category in your data that isn't listed still works (grey pin).
  categories: [
    { name: 'Food',           color: '#c8402f', icon: '🍜' },
    { name: 'Snacks',         color: '#d98a00', icon: '🍡' },
    { name: 'Souvenirs',      color: '#7a4fd0', icon: '🎁' },
    { name: 'Shopping',       color: '#5b5fc7', icon: '🛍️' },
    { name: 'Accommodation',  color: '#1e7a8c', icon: '🛏️' },
    { name: 'Sights',         color: '#2f8a4c', icon: '⛩️' },
    { name: 'Theme Parks',    color: '#d13a82', icon: '🎢' },
    { name: 'Parking',        color: '#2563a8', icon: '🅿️' },
    { name: 'Getting around', color: '#5f6b7a', icon: '🚗' },
  ],
  defaultCategory: { color: '#6b7280', icon: '📍' },

  // Optional: a pin icon per "type" (overrides the category icon).
  typeIcons: {
    'Ramen': '🍜', 'Tsukemen': '🍜', 'Udon': '🍜', 'Soba': '🍜', 'Sushi': '🍣',
    'Seafood': '🦐', 'Tempura': '🍤', 'Yakitori': '🍢', 'Yakiniku': '🥩', 'Wagyu': '🥩',
    'Tonkatsu': '🍖', 'Curry': '🍛', 'Gyoza': '🥟', 'Pizza': '🍕', 'Izakaya': '🏮',
    'Café': '☕', 'Coffee': '☕', 'Matcha': '🍵', 'Bakery': '🥐', 'Dessert': '🍩',
    'Ice cream': '🍦', 'Gelato': '🍨', 'Doughnuts': '🍩', 'Chocolate': '🍫', 'Senbei': '🍘',
    'Wagashi': '🍡', 'Bar': '🍸', 'Gyukatsu': '🥩', 'Kushikatsu': '🍢', 'Steak': '🥩',
    'Tendon': '🍤', 'Breakfast': '🍳', 'Toiletries': '🧴',
    'Clothing': '👕', 'Market': '🧺',
    'Hotel': '🏨', 'Ryokan': '♨️', 'Onsen': '♨️', 'Glamping': '⛺',
    'Viewpoint': '🗻', 'Photo spot': '📷', 'Temple': '⛩️', 'Shrine': '⛩️', 'Beach': '🏖️',
    'Park': '🏰', 'Attraction': '🎠', 'Car rental': '🚗', 'Airport': '✈️',
  },

  scenicHeading: 'Scenic drives we recommend',
};
