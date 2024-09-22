import React from 'react'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Map } from './Map'

import { icons } from '@/constants'

type Props = {
	children: React.ReactNode
	title?: string
	snapPoints?: string[]
}

export const RideLayout = ({
	children,
	title = 'Go Back',
	snapPoints,
}: Props) => {
	const bottomSheetRef = React.useRef<BottomSheet>(null)

	const defaultSnapPoints = React.useMemo(() => ['40%', '85%'], [])

	return (
		<GestureHandlerRootView>
			<View className="flex-1 bg-white">
				<View className="flex flex-col h-screen bg-blue-500">
					<View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
						<TouchableOpacity onPress={() => router.back()}>
							<View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
								<Image
									source={icons.backArrow}
									resizeMode="contain"
									className="w-6 h-6"
								/>
							</View>
						</TouchableOpacity>
						<Text className="text-xl font-JakartaSemiBold ml-5">{title}</Text>
					</View>

					<Map />
				</View>

				<BottomSheet
					ref={bottomSheetRef}
					snapPoints={snapPoints ?? defaultSnapPoints}
					index={0}
					keyboardBehavior="extend"
				>
					<BottomSheetView style={{ flex: 1, padding: 20 }}>
						{children}
					</BottomSheetView>
				</BottomSheet>
			</View>
		</GestureHandlerRootView>
	)
}
