import React from 'react'
import { Text } from 'react-native'
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps'

export const Map = () => {
	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className="w-full h-full rounded-2xl"
			tintColor="black"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			showsUserLocation
			userInterfaceStyle="light"
		>
			<Text>MAP</Text>
		</MapView>
	)
}
