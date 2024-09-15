import React from 'react'
import { RideCard } from '@/components/RideCard'
import { icons, images } from '@/constants'
import { recentRides } from '@/utils/mock'
import { useUser } from '@clerk/clerk-expo'
import {
	ActivityIndicator,
	FlatList,
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { GoogleTextInput } from '@/components/GoogleTextInput'

export default function Page() {
	const { user } = useUser()

	const loading = true

	const handleSignOut = React.useCallback(() => {}, [])

	const handleDestinationPress = React.useCallback(() => {}, [])

	const listEmptyComponent = () => {
		return (
			<View className="flex flex-col items-center justify-center">
				{!loading ? (
					<>
						<Image
							source={images.noResult}
							className="w-40 h-40"
							alt="No recent rides found"
							resizeMode="contain"
						/>

						<Text className="text-sm">No recent rides found</Text>
					</>
				) : (
					<ActivityIndicator size="small" color="#000" />
				)}
			</View>
		)
	}

	const listHeaderComponent = () => {
		return (
			<>
				<View className="fle flex-row items-center justify-between my-5">
					<Text className="text-xl font-JakartaExtraBold capitalize">
						Welcome{', '}
						{user?.firstName ||
							user?.emailAddresses[0]?.emailAddress.split('@')[0]}{' '}
						👋🏼
					</Text>
					<TouchableOpacity
						onPress={handleSignOut}
						className="justify-center items-center w-10 h-10 rounded-full bg-white"
					>
						<Image source={icons.out} className="w-4 h-4" />
					</TouchableOpacity>
				</View>

				<GoogleTextInput
					icon={icons.search}
					containerStyle="bg-white shadow-md shadow-neutral-300"
					handlePress={handleDestinationPress}
				/>

				<>
					<Text className="text-xl font-JakartaBold mt-5 mb-3">
						Your current location
					</Text>
					<View className="flex flex-row items-center bg-transparent h-[300px]"></View>
				</>
			</>
		)
	}

	return (
		<SafeAreaView className="bg-general-500">
			<FlatList
				data={recentRides?.slice(0, 5)}
				renderItem={({ item }) => <RideCard ride={item} />}
				className="px-5"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListEmptyComponent={listEmptyComponent}
				ListHeaderComponent={listHeaderComponent}
			/>
		</SafeAreaView>
	)
}
