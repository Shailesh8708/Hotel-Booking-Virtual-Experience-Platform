// VELOCITY ONE — Automotive Configuration & Data Model

export const PAINT_FINISHES = [
  {
    id: 'velocity-orange',
    name: 'Velocity Orange',
    category: 'Heritage Pearl',
    hex: '#ff5722',
    roughness: 0.22,
    metalness: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    description: 'Triple-layer electric amber with gold flake infusion and high-depth gloss clearcoat.',
  },
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    category: 'Metallic Deep',
    hex: '#08090c',
    roughness: 0.15,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    description: 'Deep non-reflective shadow base layered with diamond-cut crystal glass clearcoat.',
  },
  {
    id: 'titanium-silver',
    name: 'Titanium Silver',
    category: 'Liquid Metal',
    hex: '#bcc3cd',
    roughness: 0.25,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Liquid mercury alloy effect reflecting pure aerodynamic airflow contours.',
  },
  {
    id: 'monaco-white',
    name: 'Monaco White',
    category: 'Satin Pearl',
    hex: '#eaf0f8',
    roughness: 0.28,
    metalness: 0.82,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    description: 'Alpine ceramic pearl with cold-spectrum luminescence and satin sheen.',
  },
  {
    id: 'cyber-graphite',
    name: 'Cyber Graphite',
    category: 'Matte Carbon',
    hex: '#1f232b',
    roughness: 0.45,
    metalness: 0.75,
    clearcoat: 0.4,
    clearcoatRoughness: 0.25,
    description: 'Forged carbon matte texture designed for stealth radar deflection and pure track dominance.',
  },
];

export const WHEEL_OPTIONS = [
  {
    id: 'aero-monoblock',
    name: '21" Forged Aero-Blade',
    material: 'Forged Magnesium',
    hex: '#b0b5be',
    weight: '7.8 kg / wheel',
    description: 'Turbine-assisted brake cooling channels crafted from single-billet aerospace magnesium.',
  },
  {
    id: 'carbon-v-spoke',
    name: '21" Carbon Fiber V-Spoke',
    material: 'Dry Weave Carbon',
    hex: '#181a1f',
    weight: '6.4 kg / wheel',
    description: 'Ultra-stiff high-modulus carbon weave reducing rotational unsprung mass by 32%.',
  },
  {
    id: 'liquid-gold',
    name: '21" Liquid Champagne Gold',
    material: 'Anodized Billet',
    hex: '#c8a458',
    weight: '8.1 kg / wheel',
    description: 'Bespoke hand-anodized gold finish with mirror-polished outer rim lip.',
  },
];

export const CALIPER_OPTIONS = [
  { id: 'orange', name: 'Velocity Amber', hex: '#ff5722' },
  { id: 'lime', name: 'Cyber Acid Lime', hex: '#84cc16' },
  { id: 'silver', name: 'Bespoke Slate', hex: '#64748b' },
  { id: 'yellow', name: 'Monza Racing Yellow', hex: '#eab308' },
];

export const CAMERA_PRESETS = [
  {
    id: 'three-quarter',
    label: '3/4 Dynamic',
    position: [4.6, 1.4, 4.8],
    target: [0, 0.4, 0],
    description: 'Classic automotive hero stance showing dramatic low haunches.',
  },
  {
    id: 'front',
    label: 'Front Stance',
    position: [0, 1.1, 5.6],
    target: [0, 0.35, 0],
    description: 'Aggressive road-hugging prow with active aerodynamic intake signature.',
  },
  {
    id: 'side',
    label: 'Aero Profile',
    position: [6.0, 1.1, 0],
    target: [0, 0.4, 0],
    description: 'Sleek teardrop canopy delivering a drag coefficient of 0.198 Cd.',
  },
  {
    id: 'rear',
    label: 'Rear Diffuser',
    position: [0, 1.3, -5.6],
    target: [0, 0.4, 0],
    description: 'Venturi tunnels and continuous full-width OLED light ribbon.',
  },
  {
    id: 'cockpit',
    label: 'Cockpit View',
    position: [1.8, 1.4, 1.6],
    target: [0, 0.55, 0.2],
    description: 'Fighter-jet inspired canopy with curved holographic instrumentation.',
  },
];

export const LIGHT_MODES = [
  {
    id: 'matrix',
    name: 'Laser Matrix Beam',
    description: 'High-intensity 84-segment laser arrays with micro-mirrored road guidance projection.',
    headlights: true,
    drl: true,
    underglow: false,
    ambientBrightness: 1.0,
  },
  {
    id: 'drl',
    name: 'Signature Blade DRL',
    description: 'Crystalline daytime running ribbons radiating a razor-sharp electric profile.',
    headlights: false,
    drl: true,
    underglow: false,
    ambientBrightness: 0.6,
  },
  {
    id: 'underglow',
    name: 'Aero Underglow',
    description: 'Ground-sweeping amber illumination accentuating aerodynamic downforce tunnels.',
    headlights: true,
    drl: true,
    underglow: true,
    ambientBrightness: 0.7,
  },
  {
    id: 'stealth',
    name: 'Stealth Night Mode',
    description: 'Ultra-low electromagnetic signature and minimal ambient luminescence.',
    headlights: false,
    drl: false,
    underglow: false,
    ambientBrightness: 0.3,
  },
];

export const TECH_SPECS = [
  { label: '0–60 MPH', value: '1.74', unit: 'SEC', subtitle: 'Verified Launch Control' },
  { label: 'POWER OUTPUT', value: '1,950', unit: 'BHP', subtitle: 'Quad-Motor Vectoring' },
  { label: 'TOP SPEED', value: '280+', unit: 'MPH', subtitle: 'Electronically Governed' },
  { label: 'MAX RANGE', value: '520', unit: 'MILES', subtitle: 'EPA Estimated Cycle' },
  { label: 'BATTERY ARCHITECTURE', value: '800', unit: 'VOLTS', subtitle: 'Solid-State Silicon Carbide' },
  { label: 'PEAK DOWNFORCE', value: '850', unit: 'KG', subtitle: 'At 180 MPH Track Speed' },
];

export const DESIGN_HOTSPOTS = [
  {
    id: 'splitter',
    title: 'Active Venturi Splitter',
    category: 'Aerodynamics',
    coords: [0, 0.3, 2.2],
    description: 'Channels high-speed airflow beneath the flat carbon belly pan to create genuine ground effect suction without parasitic drag.',
  },
  {
    id: 'cockpit',
    title: 'Teardrop Glass Canopy',
    category: 'Cockpit Architecture',
    coords: [0, 1.15, 0.2],
    description: 'Dual-bubble electrochromic polycarbonate bubble providing 360-degree visibility with dynamic tint transition in 0.05 seconds.',
  },
  {
    id: 'wheels',
    title: 'Aero-Turbine Wheels',
    category: 'Chassis & Dynamics',
    coords: [1.1, 0.45, 1.4],
    description: 'Carbon-magnesium composite structure featuring rotational airflow vanes that evacuate turbulent heat from the 420mm carbon-ceramic brakes.',
  },
  {
    id: 'diffuser',
    title: 'Twin-Tunnel Diffuser',
    category: 'Ground Effect',
    coords: [0, 0.45, -2.2],
    description: 'Engineered in an open-jet wind tunnel to generate 850kg of downforce while maintaining an ultra-slippery 0.198 drag coefficient.',
  },
];
