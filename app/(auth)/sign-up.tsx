import React from 'react'
import { Link, router } from 'expo-router'
import { Text, ScrollView, View, Image, Alert } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useSignUp } from '@clerk/clerk-expo'
import { InputField } from '@/components/InputField'
import { CustomButton } from '@/components/CustomButton'
import { OAuth } from '@/components/OAuth'
import { icons, images } from '@/constants'
import type { VerificationSignUp } from '@/@types/types'

const SignUp = () => {
	const [form, setForm] = React.useState({
		email: '',
		name: '',
		password: '',
	})

	const [verification, setVerification] = React.useState<VerificationSignUp>({
		state: 'default',
		error: '',
		code: '',
	})

	const [showSuccessModal, setShowSuccessModal] = React.useState(false)

	const { isLoaded, signUp, setActive } = useSignUp()

	const onSignUpPress = React.useCallback(async () => {
		if (!isLoaded) {
			return
		}

		try {
			await signUp.create({
				emailAddress: form.email,
				password: form.password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

			setVerification((prev) => ({ ...prev, state: 'pending' }))
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling
			Alert.alert('Error', err.errors[0].longMessage)
		}
	}, [isLoaded, signUp, form])

	const onPressVerify = React.useCallback(async () => {
		if (!isLoaded) {
			return
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code: verification.code,
			})

			if (completeSignUp.status === 'complete') {
				// TODO: Create a database user
				await setActive({ session: completeSignUp.createdSessionId })

				setVerification((prev) => ({ ...prev, state: 'success' }))

				return
			}

			setVerification((prev) => ({
				...prev,
				error: 'Verification failed',
				state: 'failed',
			}))
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling

			setVerification((prev) => ({
				...prev,
				error: err.errors[0].longMessage,
				state: 'failed',
			}))
		}
	}, [isLoaded, verification, setActive, signUp])

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

				<ReactNativeModal
					isVisible={verification.state === 'pending'}
					onModalHide={() => {
						if (verification.state === 'success') {
							setShowSuccessModal(true)
						}
					}}
				>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Text className="text-2xl font-JakartaExtraBold mb-2">
							Verification
						</Text>

						<Text className="font-Jakarta mb-5">
							We've sent a verification code to {form.email}
						</Text>

						<InputField
							label="Code"
							icon={icons.lock}
							placeholder="12345"
							value={verification.code}
							keyboardType="numeric"
							maxLength={6}
							onChangeText={(code) =>
								setVerification((prev) => ({ ...prev, code }))
							}
						/>

						{verification.error && (
							<Text className="text-red-500 text-sm mt-1">
								{verification.error}
							</Text>
						)}

						<CustomButton
							title="Verify email"
							textVariant="default"
							onPress={onPressVerify}
							className="mt-5 bg-success-500"
						/>
					</View>
				</ReactNativeModal>

				<ReactNativeModal isVisible={showSuccessModal}>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Image
							source={images.check}
							className="w-[110px] h-[110px] mx-auto my-5"
						/>

						<Text className="text-3xl font-JakartaBold text-center">
							Verified
						</Text>

						<Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
							You have successfully verified your account.
						</Text>

						<CustomButton
							title="Browse Home"
							className="mt-5"
							onPress={() => {
								setShowSuccessModal(false)
								router.push('/(root)/(tabs)/home')
							}}
						/>
					</View>
				</ReactNativeModal>
			</View>
		</ScrollView>
	)
}

export default SignUp
