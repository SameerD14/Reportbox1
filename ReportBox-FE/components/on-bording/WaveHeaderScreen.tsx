import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import {
	Dimensions,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import MobileSvg from "./MobileSvg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface WaveHeaderScreenProps {
	headerImageUri: string;
	children: React.ReactNode;
	imageContainerHeight?: any;
	svgStyle?: object;
	bottomContentStyle?: object;
	imageOverlayContent?: React.ReactNode;
	floatingOverlay?: React.ReactNode;
}

export default function WaveHeaderScreen({
	headerImageUri,
	children,
	imageContainerHeight = 0.6,
	svgStyle,
	bottomContentStyle,
	imageOverlayContent,
	floatingOverlay,
}: WaveHeaderScreenProps) {
	const defaultImageHeight = screenHeight * imageContainerHeight;
	const { primaryColor, secondaryColor } = useAppTheme();
	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: secondaryColor }]}
		>
			{floatingOverlay && (
				<View
					style={{
						position: "absolute",
						top: screenHeight / 2 - 150,
						left: screenWidth / 2 - 130,
						zIndex: 20,
					}}
				>
					{floatingOverlay}
				</View>
			)}

			<KeyboardAvoidingView
				behavior={Keyboard.isVisible() ? undefined : "height"}
				style={{ flex: 1 }}
				keyboardVerticalOffset={Platform.select({
					ios: 40,
					android: 10,
				})}
			>
				<ScrollView
					contentContainerStyle={[
						styles.scrollViewContent,
						{ flexGrow: 1, paddingBottom: 20 },
					]}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					bounces={false}
				>
					<View
						style={[
							styles.headerWrapper,
							{
								height: defaultImageHeight,
							},
						]}
					>
						<ImageBackground
							source={{ uri: headerImageUri }}
							style={styles.imageBackground}
							resizeMode="stretch"
						>
							<View
								style={{
									...StyleSheet.absoluteFillObject,
									backgroundColor: "#00B4C6",
									opacity: 0.3, // adjust for desired transparency
								}}
							/>
							{imageOverlayContent || (
								<MobileSvg style={svgStyle} />
							)}
						</ImageBackground>
					</View>

					<View
						style={[
							styles.bottomContent,
							bottomContentStyle,
							{ backgroundColor: secondaryColor },
						]}
					>
						{children}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
		// marginBottom: 65,
	},
	headerWrapper: {
		width: "100%",
		position: "relative",
	},
	imageBackground: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	bottomContent: {
		flex: 1,
		position: "relative",
		paddingHorizontal: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "white",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		width: "100%",
		height: 50,
		backgroundColor: "#2e2e2e",
		borderRadius: 10,
		paddingHorizontal: 15,
		color: "white",
		marginBottom: 15,
	},
	button: {
		width: "100%",
		height: 50,
		backgroundColor: "#007AFF", // Example button color
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
