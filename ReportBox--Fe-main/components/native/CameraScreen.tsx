import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/* -------------------------------------------------------------------------- */
const SCALE_FACTOR = 1.5;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ASPECT_RATIOS = {
	"4:3": {
		ratio: 4 / 3,
		getSize: () => ({
			width: screenWidth * SCALE_FACTOR,
			height: screenWidth * (3 / 4) * SCALE_FACTOR,
		}),
	},
	"1:1": {
		ratio: 1,
		getSize: () => ({
			width: screenWidth * SCALE_FACTOR,
			height: screenWidth * SCALE_FACTOR,
		}),
	},
	full: {
		ratio: screenHeight / screenWidth,
		getSize: () => ({ width: screenWidth, height: screenHeight }),
	},
	"16:9": {
		ratio: 16 / 9,
		getSize: () => ({
			width: screenWidth * SCALE_FACTOR,
			height: screenWidth * (9 / 16) * SCALE_FACTOR,
		}),
	},
};

/* --------------------------------- helper --------------------------------- */
// Ask permissions for camera and media library
const requestPermissions = async () => {
	const cameraStatus = await Camera.requestCameraPermissionsAsync();
	const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (!cameraStatus.granted || !mediaStatus.granted) {
		Alert.alert(
			"Permission required",
			"Camera and gallery access is needed."
		);
		return false;
	}
	return true;
};

// Handle Action Sheet Selection
export const handleImageChoice = async (setShowCamera: any, setImage: any) => {
	const granted = await requestPermissions();
	if (!granted) return;

	Alert.alert("Choose Image", "Select source", [
		{ text: "Camera", onPress: () => setShowCamera(true) },
		{
			text: "Gallery",
			onPress: async () => {
				const result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ["images"],
					allowsEditing: false,
					aspect: [1, 1],
					quality: 1,
				});
				if (!result.canceled) {
					setImage(result.assets[0].uri);
				}
			},
		},
		{ text: "Cancel", style: "cancel" },
	]);
};
/* -------------------------------------------------------------------------- */
const CameraScreen = ({ setShowCamera, setImage }: any) => {
	const cameraRef = useRef<any>(null);
	const [cameraType, setCameraType] = useState<CameraType>("back");
	const [aspectRatio, setAspectRatio] =
		useState<keyof typeof ASPECT_RATIOS>("4:3");
	const [lastPhoto, setLastPhoto] = useState(null);

	const cameraDimensions = ASPECT_RATIOS[aspectRatio].getSize();
	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setImage(photo.uri);
			setLastPhoto(photo.uri);
			setShowCamera(false);
		}
	};

	const flipCamera = () => {
		setCameraType((prev) => (prev === "back" ? "front" : "back"));
	};

	const cycleAspectRatio = () => {
		const ratios = Object.keys(ASPECT_RATIOS);
		const currentIndex = ratios.indexOf(aspectRatio);
		const nextIndex = (currentIndex + 1) % ratios.length;
		setAspectRatio(ratios[nextIndex] as keyof typeof ASPECT_RATIOS);
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<CameraView
				ref={cameraRef}
				style={[
					styles.camera,
					{
						width: cameraDimensions.width,
						height: cameraDimensions.height,
					},
				]}
				facing={cameraType}
			/>
			{/* Aspect Ratio Toggle */}
			<TouchableOpacity
				style={styles.aspectRatioButton}
				onPress={cycleAspectRatio}
			>
				<Text style={styles.aspectRatioText}>{aspectRatio}</Text>
			</TouchableOpacity>
			{/* Bottom Controls */}
			<View style={styles.bottomControls}>
				{/* Gallery Preview */}
				<TouchableOpacity
					style={styles.galleryButton}
					onPress={() => lastPhoto && setImage(lastPhoto)}
				>
					{lastPhoto && (
						<Image
							source={{ uri: lastPhoto }}
							style={styles.galleryPreview}
						/>
					)}
				</TouchableOpacity>

				{/* Capture Button */}
				<TouchableOpacity
					style={styles.captureButton}
					onPress={takePicture}
				>
					<View style={styles.captureButtonInner} />
				</TouchableOpacity>

				{/* Flip Button */}
				<TouchableOpacity
					style={styles.flipButton}
					onPress={flipCamera}
				>
					<Ionicons name="camera-reverse" size={28} color="white" />
				</TouchableOpacity>
			</View>
			{/* Cancel Button */}
			<TouchableOpacity
				style={styles.cancelButton}
				onPress={() => setShowCamera(false)}
			>
				<Ionicons name="close" size={30} color="white" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default CameraScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	camera: {
		marginTop: 20,
	},
	aspectRatioButton: {
		position: "absolute",
		top: 40,
		right: 20,
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 8,
		borderRadius: 20,
	},
	aspectRatioText: {
		color: "white",
		fontWeight: "bold",
	},
	bottomControls: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	galleryButton: {
		width: 50,
		height: 50,
		borderRadius: 4,
		backgroundColor: "rgba(255,255,255,0.2)",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	galleryPreview: {
		width: "100%",
		height: "100%",
	},
	captureButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 3,
		borderColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	captureButtonInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "white",
	},
	flipButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "rgba(255,255,255,0.2)",
		justifyContent: "center",
		alignItems: "center",
	},
	cancelButton: {
		position: "absolute",
		top: 40,
		left: 20,
	},
});
