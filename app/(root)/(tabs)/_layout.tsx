import React from 'react'
import { Tabs } from 'expo-router'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { TabBarIcon } from '@/components/TabBarIcon'
import { icons } from '@/constants'

const Layout = () => {
	const tabsScreenOptions: BottomTabNavigationOptions = React.useMemo(
		() => ({
			tabBarActiveTintColor: 'white',
			tabBarInactiveTintColor: 'white',
			tabBarShowLabel: false,
			tabBarStyle: {
				backgroundColor: '#333',
				borderRadius: 50,
				paddingBottom: 0,
				overflow: 'hidden',
				marginHorizontal: 20,
				marginBottom: 20,
				height: 78,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
				position: 'absolute',
			},
		}),
		[],
	)

	return (
		<Tabs initialRouteName="index" screenOptions={tabsScreenOptions}>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} source={icons.home} />
					),
				}}
			/>
			<Tabs.Screen
				name="rides"
				options={{
					title: 'Rides',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} source={icons.list} />
					),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: 'Chat',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} source={icons.chat} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} source={icons.profile} />
					),
				}}
			/>
		</Tabs>
	)
}

export default Layout
