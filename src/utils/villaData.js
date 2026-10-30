// VILLA AURELIA — Comprehensive Property Data & Content Architecture

export const VILLA_INFO = {
  name: 'Villa Aurelia',
  location: 'Punta Aurelia, Cilento Coast, Southern Italy',
  coordinates: '40.2° N, 15.3° E',
  lead: 'Two centuries of stone, restored for long summers by the sea.',
  description:
    'A restored 18th-century stone estate perched on a Mediterranean promontory, featuring an expansive sea-view terrace, private infinity saltwater pool, and century-old olive groves 300 metres from secluded coastal waters.',
  specs: [
    { label: 'Bedrooms', val: '4 En-suite Suites' },
    { label: 'Capacity', val: 'Sleeps up to 8' },
    { label: 'Living Space', val: '380 m² Interior' },
    { label: 'Private Grounds', val: '8,500 m² Olive Grove' },
    { label: 'Beach Access', val: '300m Private Path' },
    { label: 'Private Pool', val: '14m Saltwater Infinity' },
  ],
};

export const VILLA_SPACES = [
  {
    id: 'living',
    name: 'The Living Room',
    subtitle: 'Vaulted limestone arches & curated linen serenity',
    size: '85 m²',
    floor: 'Ground Level',
    view: 'Panoramic Bay of Salerno',
    image: '/media/soggiorno-1600.webp',
    secondaryImage: '/media/soggiorno-2-1600.webp',
    description:
      'Ancient stone cross-vaults frame floor-to-ceiling iron casement windows opening toward the sea. Outfitted with bespoke natural Belgian linen sectionals, hand-carved walnut library shelves, local terracotta tile floors, and a restored wood-burning fireplace for cool autumn evenings.',
    highlights: ['Bespoke Belgian linen furnishings', 'Restored stone hearth', 'Marshall acoustic sound', 'Curated architectural library'],
  },
  {
    id: 'kitchen',
    name: 'The Kitchen & Pantry',
    subtitle: 'Hand-chiseled Carrara marble & artisan culinary heart',
    size: '62 m²',
    floor: 'Ground Level',
    view: 'Morning Herb Garden',
    image: '/media/cucina-1600.webp',
    secondaryImage: '/media/cucina-2-1600.webp',
    description:
      'Designed around a monolithic island of fluted Carrara marble. Fitted with professional Gaggenau induction cooking, a restored wood-fired bread oven, sub-zero refrigeration, and a private walk-in wine cellar stocked with native Fiano and Aglianico vintages.',
    highlights: ['Monolithic Carrara marble island', 'Walk-in temperature-controlled cellar', 'Artisan copper cookware', 'Direct terrace dining pass-through'],
  },
  {
    id: 'bedroom',
    name: 'The Master Suite',
    subtitle: 'French casements opening to the horizon & morning light',
    size: '54 m²',
    floor: 'First Floor',
    view: 'Unobstructed Sunrise to Sunset Ocean',
    image: '/media/camera-1600.webp',
    secondaryImage: '/media/camera-2-1600.webp',
    description:
      'Perched on the southern wing with double-aspect French balconies. Wake to the sound of breaking waves from the custom king-size oak bed dressed in washed organic flax. The en-suite bathroom features a freestanding stone soaking tub overlooking the olive canopy.',
    highlights: ['Freestanding volcanic stone tub', 'Private cantilevered sunrise balcony', 'Custom walk-in dressing wardrobe', 'Motorized linen solar shades'],
  },
  {
    id: 'terrace',
    name: 'The Sea-View Terrace & Pool',
    subtitle: '140 m² stone belvedere suspended above the Mediterranean',
    size: '140 m²',
    floor: 'Exterior Belvedere',
    view: '360° Tyrrhenian Sea',
    image: '/media/terrazza-1600.webp',
    secondaryImage: '/media/tramonto-1600.webp',
    description:
      'Sun-baked limestone flags shaded by wild jasmine and ancient olive branches. Furnished with oversized teak sunbeds, a shaded marble dining table seating twelve, and an outdoor summer bar adjoining the 14-metre cliffside infinity pool.',
    highlights: ['14m Saltwater infinity pool', 'Al fresco dining for 12', 'Outdoor wood-fired pizza oven', 'Private cliffside sunset lounge'],
  },
];

export const AMENITIES = {
  inside: [
    { title: 'Climate Control', desc: 'Silent geothermal radiant floor cooling and multi-zone climate control.' },
    { title: 'Starlink Connectivity', desc: 'Enterprise high-speed satellite Wi-Fi across all indoor and outdoor areas.' },
    { title: 'Fine Linens & Robes', desc: 'Custom washed Italian flax bedding, organic cotton towels, and waffle robes.' },
    { title: 'Acoustic Sound', desc: 'Integrated multi-room Marshall and Sonance high-fidelity audio system.' },
    { title: 'Pure Water', desc: 'Triple-filtered natural mineral well water throughout the property.' },
  ],
  outside: [
    { title: 'Infinity Saltwater Pool', desc: '14-metre heated infinity pool with integrated submerged lounging ledge.' },
    { title: 'Private Beach Trail', desc: 'Private flagstone path through olive trees directly to a secluded pebble cove.' },
    { title: 'Wood-Fired Pizza Oven', desc: 'Traditional wood-burning outdoor oven alongside an Argentinian grill.' },
    { title: 'EV Charging Station', desc: 'Dedicated 22kW Level 2 charging port in private shaded courtyard parking.' },
  ],
  on_request: [
    { title: 'Private Estate Chef', desc: 'Daily Mediterranean breakfast and bespoke multi-course seafood dinners.' },
    { title: 'Riva Boat Charter', desc: 'Private 38ft Riva Dolceriva day charters along the Amalfi and Capri coastline.' },
    { title: 'Olive Harvest Tasting', desc: 'Guided sensory tasting of the estate’s cold-pressed single-estate olive oil.' },
    { title: 'In-Villa Wellness', desc: 'Private yoga sessions on the terrace and restorative therapeutic massage.' },
  ],
  around: [
    { title: 'Cala del Silenzio', desc: 'Secluded turquoise pebble cove with natural rock pools (4 min walk).' },
    { title: 'San Marco di Castellabate', desc: 'Charming historic fishing harbour with daily catch markets (8 min drive).' },
    { title: 'Paestum Greek Temples', desc: 'UNESCO World Heritage 6th-century BC Doric temples (30 min drive).' },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      'Watching the golden hour light settle over the olive trees from the terrace while the sea turned to deep violet is a memory our family will hold for decades. The silence here is absolute.',
    author: 'Elena & Marcus Vance',
    origin: 'London, United Kingdom',
    stay: 'Stayed 14 nights in June',
  },
  {
    quote:
      'The restoration of the stone is astonishing. Every surface, from the cool limestone underfoot to the morning sea breeze through the French windows, feels thoughtful, understated, and timeless.',
    author: 'Dr. Henrik Lindqvist',
    origin: 'Stockholm, Sweden',
    stay: 'Stayed 10 nights in September',
  },
  {
    quote:
      'We spent entire days without leaving the grounds. The private trail down to the cove, the scent of wild rosemary, and dinner prepared over the outdoor oven made this our finest summer in Italy.',
    author: 'Sophie & Laurent de Montmirail',
    origin: 'Paris, France',
    stay: 'Stayed 7 nights in August',
  },
];

export const FAQS = [
  {
    q: 'What are the check-in and checkout times?',
    a: 'Check-in is from 16:00 to 20:00, where your villa host will welcome you with chilled regional wine and estate olive oil. Checkout is by 10:30 to allow our housekeeping team to prepare the estate.',
  },
  {
    q: 'Is there a minimum stay requirement?',
    a: 'During peak summer (July and August), reservations require a 7-night minimum stay from Saturday to Saturday. During spring and autumn shoulder seasons, stays of 4 nights or more are warmly welcomed.',
  },
  {
    q: 'How do we reach the private beach cove?',
    a: 'A private landscaped stone pathway winds gently through the lower olive grove and maritime pines directly to the secluded beach in approximately 4 minutes. Private beach chairs and sun umbrellas are provided.',
  },
  {
    q: 'Is the villa fully serviced during our stay?',
    a: 'Yes. Daily housekeeping and breakfast setup are included. Mid-week linen changes, pool servicing, and garden maintenance occur discreetly to preserve your privacy.',
  },
  {
    q: 'Is Villa Aurelia suitable for children?',
    a: 'Yes. Children of all ages are welcome. We provide handcrafted wooden cribs, highchairs, and safety pool alarms upon request.',
  },
  {
    q: 'How do we get to Villa Aurelia from Naples or Rome?',
    a: 'Naples Capodichino International Airport (NAP) is 90 minutes by car. We can arrange private Mercedes chauffeur transfers or helicopter arrivals directly to our estate helipad clearing.',
  },
];

export const GALLERY_PHOTOS = [
  { id: '1', title: 'The Historic Stone Facade & Entrance', category: 'Grounds', src: '/media/ingresso-1600.webp' },
  { id: '2', title: 'Cantilevered Sea Terrace at Sunset', category: 'Terrace', src: '/media/terrazza-1600.webp' },
  { id: '3', title: 'Vaulted Limestone Living Room', category: 'Living', src: '/media/soggiorno-1600.webp' },
  { id: '4', title: 'Hearth & Reading Corner', category: 'Living', src: '/media/soggiorno-2-1600.webp' },
  { id: '5', title: 'Artisan Kitchen & Carrara Island', category: 'Kitchen', src: '/media/cucina-1600.webp' },
  { id: '6', title: 'Dining Pass & Handcrafted Ceramics', category: 'Kitchen', src: '/media/cucina-2-1600.webp' },
  { id: '7', title: 'Master Bedroom with Ocean French Windows', category: 'Bedrooms', src: '/media/camera-1600.webp' },
  { id: '8', title: 'Freestanding Stone Soaking Tub & Details', category: 'Bedrooms', src: '/media/camera-2-1600.webp' },
  { id: '9', title: 'Twilight Over the Mediterranean & Olive Canopy', category: 'Terrace', src: '/media/tramonto-1600.webp' },
];

