import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Dimensions,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ImagePreviewModel = ({ showImage, setShowImage, image }: any) => {
	const { transparentBackground } = useAppTheme();
	return (
		<Modal
			visible={showImage}
			transparent={true}
			onRequestClose={() => setShowImage(false)}
			animationType="fade"
		>
			<Pressable
				style={[
					styles.imageViewerContainer,
					{ backgroundColor: transparentBackground },
				]}
				onPress={() => setShowImage(false)}
			>
				<Image
					source={{ uri: image }}
					style={styles.fullScreenImage}
					resizeMode="contain"
				/>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={() => setShowImage(false)}
				>
					<Ionicons name="close-circle" size={40} color="white" />
				</TouchableOpacity>
			</Pressable>
		</Modal>
	);
};

export default ImagePreviewModel;
const styles = StyleSheet.create({
	imageViewerContainer: {
		flex: 1,

		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenImage: {
		width: screenWidth * 0.9,
		height: screenHeight * 0.8,
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 1,
	},
});
