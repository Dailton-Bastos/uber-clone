import { ButtonProps } from '@/@types/types'

export const getBgVariantStyle = (
	variant: ButtonProps['bgVariant'],
): string => {
	switch (variant) {
		case 'secondary':
			return 'bg-gray-500'
		case 'danger':
			return 'bg-red-500'
		case 'success':
			return 'bg-green-500'
		case 'outline':
			return 'bg-transparent border border-neutral-100 border-[0.5px]'

		default:
			return 'bg-[#0286ff]'
	}
}

export const getTextVariantStyle = (
	variant: ButtonProps['textVariant'],
): string => {
	switch (variant) {
		case 'primary':
			return 'text-black'
		case 'secondary':
			return 'text-gray-100'
		case 'danger':
			return 'text-red-100'
		case 'success':
			return 'text-green-100'

		default:
			return 'text-white'
	}
}
