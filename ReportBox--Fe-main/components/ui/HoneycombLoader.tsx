import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

const HoneycombLoader = () => {
	const { primaryColor, secondaryColor } = useAppTheme();
	const scheme = useColorScheme();
	const animations = Array.from(
		{ length: 7 },
		() => useRef(new Animated.Value(0.5)).current
	);
	useEffect(() => {
		// Define rotating sequence order (clockwise around center)
		const rotatingOrder = [0, 1, 2, 3, 4, 5, 6]; // 6 = center

		// Repeat the rotating animation
		const animateHexagons = () => {
			rotatingOrder.forEach((i, index) => {
				const anim = animations[i];
				Animated.sequence([
					Animated.delay(index * 100),
					Animated.timing(anim, {
						toValue: 1,
						duration: 300,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
					Animated.timing(anim, {
						toValue: 0,
						duration: 300,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
				]).start(() => {
					if (i === rotatingOrder[rotatingOrder.length - 1]) {
						// restart sequence after last hexagon
						animateHexagons();
					}
				});
			});
		};

		animateHexagons();
	}, []);

	const overlayColor =
		scheme === "dark" ? "rgba(241,241,241,0.4)" : "rgba(52,50,50,0.5)";

	const offsets = [
		{ x: -28, y: 0 },
		{ x: -14, y: 24 },
		{ x: 14, y: 24 },
		{ x: 28, y: 0 },
		{ x: 14, y: -24 },
		{ x: -14, y: -24 },
		{ x: 0, y: 0 },
	];

	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				styles.container,
				{ backgroundColor: overlayColor, zIndex: 1000 },
			]}
		>
			<View style={styles.honeycomb}>
				{animations.map((anim, i) => (
					<Animated.View
						key={i}
						style={{
							position: "absolute",
							left: 56 + offsets[i].x, // container center + offset
							top: 56 + offsets[i].y,
							width: 18,
							height: 18,
							transform: [{ scale: anim }],
							opacity: anim,
						}}
					>
						<Svg height="100%" width="100%" viewBox="0 0 100 100">
							<Polygon
								points="50,0 93,25 93,75 50,100 7,75 7,25"
								fill={primaryColor}
							/>
						</Svg>
					</Animated.View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center", // vertical center
		alignItems: "center", // horizontal center
		zIndex: 1000,
	},
	honeycomb: {
		width: 120,
		height: 120,
		position: "relative",
		zIndex: 1000,
	},
});

export default HoneycombLoader;
