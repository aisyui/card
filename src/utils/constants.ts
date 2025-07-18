export const SKILL_ICONS = {
  critical: 'icon-sandar',
  post: 'icon-moon',
  luck: 'icon-api',
  ten: 'icon-power',
  lost: '●',
  dragon: 'icon-home',
  nyan: '▲',
  yui: 'icon-ai',
  '3d': '■',
  model: 'fa-solid fa-cube',
  first: 'icon-moji_a'
} as const;

export const PLANET_THRESHOLDS = {
  GALAXY: 1000000,
  NEUTRON: 466666,
  SUN: 333000,
  EARTH: 1.0,
  MOON: 0
} as const;

export const CARD_EMISSION_RATES = {
  normal: 90,
  rare: 9,
  super: 1
} as const;

export const CP_RANGES = {
  normal: { min: 0, max: 200 },
  rare: { min: 0, max: 450 },
  super: { min: 0, max: 800 }
} as const;