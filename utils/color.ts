import type { ColorOption } from '~/types/color'

export const getSupportedColor = (color?: string | null) => {
  if (!color) return 'gray'
  const colors: ColorOption[] = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
  return colors.includes(color as ColorOption) ? color : 'gray'
}

export const getColorClass = (color?: string | null) => {
  return `bg-${getSupportedColor(color)}-400 dark:bg-${getSupportedColor(color)}-700`
}

// Trick tailwindcss JIT to generate the classes
// bg-blue-400
// bg-green-400
// bg-indigo-400
// bg-pink-400
// bg-purple-400
// bg-red-400
// bg-yellow-400
// dark:bg-blue-700
// dark:bg-green-700
// dark:bg-indigo-700
// dark:bg-pink-700
// dark:bg-purple-700
// dark:bg-red-700
