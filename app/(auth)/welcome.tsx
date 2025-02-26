import React from 'react'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'
import { onboarding } from '@/constants'
import { CustomButton } from '@/components/CustomButton'

const Onboarding = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const swiperRef = React.useRef<Swiper>(null)

	const isLastSlide = React.useMemo(
		() => activeIndex === onboarding.length - 1,
		[activeIndex],
	)

	const handleSkip = React.useCallback(() => {
		router.replace('/(auth)/sign-up')
	}, [])

	const handleCustomButton = React.useCallback(() => {
		return isLastSlide
			? router.replace('/(auth)/sign-up')
			: swiperRef.current?.scrollBy(1)
	}, [isLastSlide])

	return (
		<SafeAreaView className="flex h-full items-center justify-between bg-white">
			<TouchableOpacity
				onPress={handleSkip}
				className="w-full flex justify-end items-end p-5"
			>
				<Text className="text-black text-md font-JakartaBold">Skip</Text>
			</TouchableOpacity>

			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className="w-[32px] h-[4px] bg-[#e2e8f0] rounded-full mx-1" />
				}
				activeDot={
					<View className="w-[32px] h-[4px] bg-[#0286ff] rounded-full" />
				}
				onIndexChanged={(index: number) => setActiveIndex(index)}
			>
				{onboarding.map((item) => (
					<View key={item.id} className="flex items-center justify-center">
						<Image
							source={item.image}
							resizeMode="contain"
							className="w-full h-[300px]"
						/>

						<View className="flex flex-row items-center justify-center w-full mt-10">
							<Text className="text-black text-3xl font-bold mx-10 text-center">
								{item.title}
							</Text>
						</View>
						<Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
							{item.description}
						</Text>
					</View>
				))}
			</Swiper>

			<CustomButton
				title={isLastSlide ? 'Get Started' : 'Next'}
				className="w-11/12 mt-10"
				onPress={handleCustomButton}
			/>
		</SafeAreaView>
	)
}

export default Onboarding
