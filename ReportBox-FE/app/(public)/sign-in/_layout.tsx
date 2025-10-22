import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
const SignINayout = () => {
	const navigation = useNavigation();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="verify-otp"
				options={({ route }) => ({
					headerShown: false,
					title: "",
					headerTransparent: true,
					headerLeft: () => (
						<HeaderBackButton
							tintColor="#fff"
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="verified"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="profile-form"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
		</Stack>
	);
};

export default SignINayout;
