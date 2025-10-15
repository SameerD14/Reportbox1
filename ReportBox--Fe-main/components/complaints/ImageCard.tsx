import { handleImageChoice } from "@/components/native/CameraScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

const ImageCard = ({
	image,
	setShowCamera = () => {},
	setImage = () => {},
	showCaptureIcon = true,
}: any) => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	return (
		<View style={{ flex: 1, paddingBottom: 20 }}>
			<View style={{ position: "relative", marginTop: 10 }}>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{
							height: 200,
							width: "100%",
							borderRadius: 15,
						}}
						resizeMode="cover"
					/>
				) : (
					<View
						style={{
							height: 200,
							borderRadius: 30,
							backgroundColor: cardsColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<FontAwesome5 name="images" size={60} color="#ccc" />
					</View>
				)}

				{/* Camera icon at the bottom center */}
				{showCaptureIcon && (
					<View
						style={{
							position: "absolute",
							bottom: -19,
							left: "48%",
							transform: [{ translateX: -15 }],
							backgroundColor: cardsColor,
							borderRadius: 30,
							padding: 10,
							elevation: 5, // shadow on Android
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
						}}
					>
						<Fontisto
							name="camera"
							size={23}
							color="#ccc"
							onPress={() =>
								handleImageChoice(setShowCamera, setImage)
							}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default ImageCard;
