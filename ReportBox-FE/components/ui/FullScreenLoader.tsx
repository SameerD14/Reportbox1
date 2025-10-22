import { useAppTheme } from "@/hooks/useAppTheme"; // or your theme hook
import { BlurView } from "expo-blur";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
export const FullScreenLoader = () => {
	const { primaryColor, bgLoader } = useAppTheme();

	return (
		<BlurView
			intensity={50}
			style={[
				StyleSheet.absoluteFill,
				{
					zIndex: 999,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: bgLoader,
				},
			]}
		>
			<ActivityIndicator size={60} color={primaryColor} />
		</BlurView>
	);
};
