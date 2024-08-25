import React from 'react'
import { Link } from 'expo-router'
import { Text, ScrollView, View, Image } from 'react-native'
import { InputField } from '@/components/InputField'
import { CustomButton } from '@/components/CustomButton'
import { OAuth } from '@/components/OAuth'
import { icons, images } from '@/constants'

const SignUp = () => {
	const [form, setForm] = React.useState({
		email: '',
		name: '',
		password: '',
	})

	const onSignUpPress = React.useCallback(async () => {}, [])

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

					<Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
						Create Your Account
					</Text>
				</View>

				<View className="p-5">
					<InputField
						label="Name"
						placeholder="Enter your name"
						icon={icons.person}
						value={form.name}
						onChangeText={(value) =>
							setForm((prev) => ({ ...prev, name: value }))
						}
					/>

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
						title="Sign Up"
						className="mt-6"
						onPress={onSignUpPress}
						textVariant="danger"
					/>

					<OAuth />

					<Link
						href="/sign-in"
						className="text-lg text-center text-general-200 mt-10"
					>
						<Text>Already have an account?</Text>{' '}
						<Text className="text-primary-500">Log In</Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignUp
