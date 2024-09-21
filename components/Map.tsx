import { MarkerData } from '@/@types/types'
import { icons } from '@/constants'
import { calculateRegion, generateMarkersFromData } from '@/lib/map'
import { useDriverStore, useLocationStore } from '@/store'
import { drivers } from '@/utils/mock'
import React from 'react'
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps'

export const Map = () => {
	const [markers, setMarkers] = React.useState<MarkerData[]>([])

	const {
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore()

	const region = calculateRegion({
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	})

	const { selectedDriver, setDrivers } = useDriverStore()

	React.useEffect(() => {
		if (Array.isArray(drivers)) {
			if (!userLatitude || !userLongitude) return

			const newMarkers = generateMarkersFromData({
				data: drivers,
				userLatitude,
				userLongitude,
			})

			setMarkers(newMarkers)
		}
	}, [userLatitude, userLongitude])

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className="w-full h-full rounded-2xl"
			tintColor="black"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			showsUserLocation
			userInterfaceStyle="light"
			initialRegion={region}
		>
			{markers.map((marker) => (
				<Marker
					key={marker.id}
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
					title={marker.title}
					image={
						selectedDriver === marker.id ? icons.selectedMarker : icons.marker
					}
				/>
			))}
		</MapView>
	)
}
