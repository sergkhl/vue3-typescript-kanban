export const TRANSITION_NAMES = ['fade', 'top', 'left', 'right'] as const

export const CARD_STATUSES = [
  'on-hold',
  'in-progress',
  'needs-review',
  'approved',
] as const

export const ICONS = {
  empty: '',
  dashboard: 'M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z',
} as const
