import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { BaseToast, ToastConfig } from "react-native-toast-message";
const getToastColors = (
	type: "success" | "error" | "info",
	primaryColor: string
) => {
	switch (type) {
		case "success":
			return {
				borderColor: primaryColor,
				barColor: primaryColor,
			};
		case "error":
			return {
				borderColor: "#F44336",
				barColor: "#F44336",
			};
		case "info":
			return {
				borderColor: "#FFC107",
				barColor: "#FFC107",
			};
		default:
			return {
				borderColor: "#999",
				barColor: "#999",
			};
	}
};
const ThemedToast = ({ type, ...props }: any) => {
	const { primaryColor, textColor, secondaryColor, cardsColor } =
		useAppTheme();

	const uniqueKey = `${Date.now()}-${Math.random()}`;
	const { borderColor, barColor } = getToastColors(type, primaryColor);

	return (
		<View style={styles.toastContainer}>
			<BaseToast
				{...props}
				style={[
					styles.toastBase,
					{
						borderLeftColor: borderColor,
						backgroundColor: cardsColor,
					},
				]}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={[styles.text1, { color: textColor }]}
			/>
			<ProgressBar key={uniqueKey} color={barColor} />
		</View>
	);
};
const ProgressBar = ({ duration = 3000, color = "#4CAF50" }) => {
	const widthAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		widthAnim.setValue(1);
		Animated.timing(widthAnim, {
			toValue: 0,
			duration,
			useNativeDriver: false,
		}).start();
	}, []);

	return (
		<Animated.View
			style={[
				styles.progressBar,
				{
					width: widthAnim.interpolate({
						inputRange: [0, 1],
						outputRange: ["0%", "100%"],
					}),
					backgroundColor: color,
				},
			]}
		/>
	);
};

export const toastConfig: ToastConfig = {
	success: (props) => {
		return <ThemedToast {...props} type="success" />;
	},
	error: (props) => {
		return <ThemedToast {...props} type="error" />;
	},
	info: (props) => {
		return <ThemedToast {...props} type="info" />;
	},
};
const styles = StyleSheet.create({
	toastContainer: {
		alignSelf: "flex-end",
		marginTop: 30,
		marginRight: 10,
		width: "70%",
	},
	toastBase: {
		borderLeftWidth: 5,
		borderRadius: 8,
	},
	text1: {
		fontSize: 15,
		fontWeight: "bold",
	},
	progressBar: {
		height: 4,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		marginLeft: 7,
	},
});
