export const CARD_STATUS_COLORS = {
  yui: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  first: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  second: 'bg-gradient-to-br from-gray-600 to-black',
  third: 'bg-gradient-to-br from-pink-500 to-yellow-400',
  fourth: 'bg-gradient-to-br from-blue-400 to-blue-600',
  fifth: 'bg-gradient-to-br from-red-500 to-red-800',
  sixth: 'bg-gradient-to-br from-gray-100 to-gray-800',
  seven: 'bg-gradient-to-br from-yellow-400 to-yellow-700',
  normal: 'bg-white'
} as const;

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