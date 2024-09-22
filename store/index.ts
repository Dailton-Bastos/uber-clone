import { create } from 'zustand'

import type { DriverStore, LocationStore, MarkerData } from '@/@types/types'

export const useLocationStore = create<LocationStore>((set) => ({
	userAddress: null,
	userLatitude: null,
	userLongitude: null,
	destinationLatitude: null,
	destinationLongitude: null,
	destinationAddress: null,
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number
		longitude: number
		address: string
	}): void => {
		set(() => ({
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		}))
	},
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number
		longitude: number
		address: string
	}): void => {
		set(() => ({
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		}))
	},
}))

export const useDriverStore = create<DriverStore>((set) => ({
	drivers: [] as MarkerData[],
	selectedDriver: null,
	setSelectedDriver: (driverId: number) => {
		return set(() => ({ selectedDriver: driverId }))
	},
	setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
	clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}))
