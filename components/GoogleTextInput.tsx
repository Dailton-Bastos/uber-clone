import React from 'react'
import { Text, View } from 'react-native'

import type { GoogleInputProps } from '@/@types/types'

export const GoogleTextInput = ({
	icon,
	initialLocation,
	containerStyle,
	textInputBackgroundColor,
	handlePress,
}: GoogleInputProps) => {
	return (
		<View
			className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
		>
			<Text>Search</Text>
		</View>
	)
}
