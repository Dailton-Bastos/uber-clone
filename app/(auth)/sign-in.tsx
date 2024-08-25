import React from 'react'
import { Link } from 'expo-router'
import { Text, ScrollView, View, Image } from 'react-native'
import { InputField } from '@/components/InputField'
import { CustomButton } from '@/components/CustomButton'
import { OAuth } from '@/components/OAuth'
import { icons, images } from '@/constants'

const SignIn = () => {
	const [form, setForm] = React.useState({
		email: '',
		password: '',
	})

	const onSignInPress = React.useCallback(async () => {}, [])

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

					<Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
						Welcome 👋🏼
					</Text>
				</View>

				<View className="p-5">
					<InputField
						label="Email"
						placeholder="Enter your email"
						icon={icons.email}
						value={form.email}
						onChangeText={(value) =>
							setForm((prev) => ({ ...prev, email: value }))
						}
					/>

					<InputField
						label="Password"
						placeholder="Enter your password"
						icon={icons.lock}
						secureTextEntry
						value={form.password}
						onChangeText={(value) =>
							setForm((prev) => ({ ...prev, password: value }))
						}
					/>

					<CustomButton
						title="Sign In"
						className="mt-6"
						onPress={onSignInPress}
						textVariant="danger"
					/>

					<OAuth />

					<Link
						href="/sign-up"
						className="text-lg text-center text-general-200 mt-10"
					>
						<Text>Don't have an account?</Text>{' '}
						<Text className="text-primary-500">Sign Up</Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignIn
