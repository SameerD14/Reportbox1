/* -------------------------------------------------------------------------- */
/*                           Custom animated Switch                           */
/* -------------------------------------------------------------------------- */
import { useAppTheme } from "@/hooks/useAppTheme";
import { useEffect, useRef } from "react";
import {
	Animated,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

interface CustomSwitchProps {
	isEnabled: boolean;
	disabled?: boolean;
	setIsEnabled: any;
}

const CustomSwitch = ({
	isEnabled = true,
	setIsEnabled,
	disabled = false,
}: CustomSwitchProps) => {
	/* --------------------------- Reference Variables -------------------------- */
	const { primaryColor } = useAppTheme();

	const translateX = useRef(new Animated.Value(isEnabled ? 30 : 0)).current; // Initialize translateX based on current isEnabled state

	const currentEnabled = useRef(isEnabled); // Track the current enabled state for animation cleanup

	const backgroundColorAnim = useRef(
		new Animated.Value(isEnabled ? 1 : 0)
	).current;
	// Background color animation

	/* -------------------------------------------------------------------------- */

	const bgColor = backgroundColorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["#c1c1c1", "#FFF"], // Off color to on color
	});
	const toggleSwitch = () => {
		if (!disabled) {
			const newValue = !currentEnabled.current;
			setIsEnabled(newValue);
		}
	};

	/* -------------------------------- useEffect ------------------------------- */

	useEffect(() => {
		// Animate both position and color when isEnabled changes
		Animated.parallel([
			Animated.spring(translateX, {
				toValue: isEnabled ? 30 : 0,
				useNativeDriver: Platform.OS === "android",
			}),
			Animated.timing(backgroundColorAnim, {
				toValue: isEnabled ? 1 : 0,
				duration: 200,
				useNativeDriver: Platform.OS === "android",
			}),
		]).start();

		currentEnabled.current = isEnabled;
	}, [isEnabled]);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TouchableOpacity
				activeOpacity={0.9}
				style={{
					width: 53,
					height: 24,
					borderRadius: 12,
					justifyContent: "center",
					padding: 1,
					opacity: disabled ? 0.5 : 1,
				}}
				onPress={toggleSwitch}
				disabled={disabled}
			>
				<Animated.View
					style={{
						...StyleSheet.absoluteFillObject,
						borderRadius: 12,
						backgroundColor: bgColor,
					}}
				/>
				<Animated.View
					style={{
						width: 18,
						height: 18,
						borderRadius: 9,
						backgroundColor: primaryColor,
						position: "absolute",
						top: 3,
						left: 3,
						transform: [{ translateX }],
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};
export default CustomSwitch;
