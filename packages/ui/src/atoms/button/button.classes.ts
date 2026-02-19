import type { ButtonProps } from './button.types'

export function getVariantClasses(variant: NonNullable<ButtonProps['variant']>) {
  switch (variant) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-600'
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 focus-visible:outline-gray-500'
    case 'outline':
      return 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:outline-blue-600'
  }
}

export function getSizeClasses(size: NonNullable<ButtonProps['size']>) {
  switch (size) {
    case 'sm':
      return 'px-3 py-1 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-6 py-3 text-lg'
  }
}
