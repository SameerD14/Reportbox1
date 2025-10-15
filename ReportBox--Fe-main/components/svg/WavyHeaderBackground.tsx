import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");

const generateWavePath = (amplitude = 0.35, height = 200, points = 100) => {
	let path = `M0 ${height}`;
	for (let i = 0; i <= points; i++) {
		const x = (width / points) * i;
		const y =
			height * (0.5 + amplitude * Math.sin((2 * Math.PI * i) / points));
		path += ` L${x} ${y}`;
	}
	path += ` L${width} ${height} L0 ${height} Z`;
	return path;
};

function WavyBanner() {
	const waveHeight = 500;
	const path = generateWavePath(0.35, waveHeight, 100);
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.banner, { backgroundColor: primaryColor }]}>
				<Svg
					width={width}
					height={waveHeight}
					style={styles.wave}
					viewBox={`0 0 ${width} ${waveHeight}`}
				>
					<Path d={path} fill={secondaryColor} />
				</Svg>
			</View>

			<View style={styles.section} />
		</View>
	);
}

export default function WavyHeaderBackground() {
	const waveHeight = 50;
	const path = generateWavePath(0.35, waveHeight, 100);
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<Svg
			width={width}
			height={waveHeight}
			viewBox={`0 0 ${width} ${waveHeight}`}
			style={{ position: "absolute", bottom: 0 }}
		>
			<Rect
				x="0"
				y="0"
				width={width}
				height={waveHeight}
				fill={primaryColor}
			/>
			<Path d={path} fill={secondaryColor} />
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		height: "100%",
		width: "100%",

		alignItems: "center",
		paddingTop: 64,
		position: "relative",
	},
	title: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "Poppins",
	},
	link: {
		color: "white",
		marginTop: 12,
		marginBottom: 24,
		textDecorationLine: "underline",
	},
	desc: {
		color: "white",
		fontFamily: "Poppins",
	},
	wave: {
		position: "absolute",
		bottom: 0,
		left: 0,
	},
	section: {
		height: Dimensions.get("screen").height,
		backgroundColor: "pink",
	},
});
