import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path, Text, TSpan } from "react-native-svg";

const Blob = ({ text, iconName }: any) => {
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<View style={styles.container}>
			<Svg viewBox="0 0 200 200" style={styles.svg}>
				<Path
					fill={primaryColor}
					d="M58,-13.1C67.3,9.8,61.6,43.4,41,59C20.4,74.5,-15.1,72.1,-39.4,54.4C-63.7,36.7,-76.7,3.8,-68.3,-18C-59.9,-39.7,-29.9,-50.2,-2.8,-49.3C24.3,-48.4,48.7,-36,58,-13.1Z"
					transform="translate(100 100)"
				/>
			</Svg>
			<View style={styles.overlay}>
				<Ionicons
					name={iconName}
					size={35}
					color={secondaryColor}
					style={{ marginBottom: 5 }}
				/>
				<TextSVG text={text} />
			</View>
		</View>
	);
};

export default Blob;

const TextSVG = ({ text }: { text: string }) => {
	const { secondaryColor } = useAppTheme();

	// Split text into lines of max 15 characters
	const lines = text.match(/.{1,15}/g) || [];

	return (
		<Svg height={lines.length * 20} width="200">
			<Text
				x="100"
				y="0"
				fill={secondaryColor}
				fontSize="16"
				fontWeight="bold"
				textAnchor="middle"
			>
				{lines.map((line, i) => (
					<TSpan key={i} x="100" dy={i === 0 ? 15 : 20}>
						{line}
					</TSpan>
				))}
			</Text>
		</Svg>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	svg: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	overlay: {
		justifyContent: "center",
		alignItems: "center",
	},
});
