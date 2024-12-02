const _options = [
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'teal',
  'pink'
] as const

export type ColorOption = typeof _options[number]
