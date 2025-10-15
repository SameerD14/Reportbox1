import StackHeader from "@/components/ui/StackHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const ProtectedLayout = () => {
	const { primaryColor } = useAppTheme();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					title: "Help",
					animation: "simple_push",
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader
								showBackIcon={true}
								showMenuDrawer={false}
								showThreeDots={false}
								backIconTitle="Settings"
							/>
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="help"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					animation: "simple_push",
					title: "Help",
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader
								showBackIcon={true}
								showMenuDrawer={false}
								showThreeDots={false}
							/>
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="about"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					animation: "ios_from_left",
					title: "Help",
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader
								showBackIcon={false}
								showMenuDrawer={true}
								showThreeDots={false}
							/>
						</SafeAreaView>
					),
				})}
			/>
		</Stack>
	);
};

export default ProtectedLayout;
