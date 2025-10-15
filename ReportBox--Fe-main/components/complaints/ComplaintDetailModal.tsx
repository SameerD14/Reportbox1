import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ComplaintDetailModal({
	visible,
	onClose,
	complaint,
}: any) {
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	return (
		<Modal visible={visible} animationType="fade" transparent>
			<View className="flex-1 justify-center items-center bg-black/60 px-4">
				<View
					className=" rounded-xl w-full p-4 max-w-md"
					style={{
						zIndex: 1,
						elevation: 10,
						backgroundColor: secondaryColor,
					}} // <-- Android fix
				>
					<Pressable
						onPress={onClose}
						className="absolute top-3 right-3 p-1 z-10 rounded-full"
						style={{ zIndex: 10, elevation: 10 }} // <-- Ensure above all content
					>
						<Ionicons name="close" size={22} color="#ccc" />
					</Pressable>
					{/* Images */}
					<View style={styles.imageRow}>
						{complaint?.beforeImage && (
							<TouchableOpacity
								style={styles.imageHalfTouchable}
								// onPress={() => openImageViewer(item.beforeImage)}
								activeOpacity={0.7}
							>
								<Image
									source={{ uri: complaint?.beforeImage }}
									style={styles.imageHalf}
									resizeMode="cover"
								/>
							</TouchableOpacity>
						)}
						{complaint?.afterImage && (
							<TouchableOpacity
								style={styles.imageHalfTouchable}
								// onPress={() => openImageViewer(item.afterImage)}
								activeOpacity={0.7}
							>
								<Image
									source={{ uri: complaint?.afterImage }}
									style={styles.imageHalf}
									resizeMode="cover"
								/>
							</TouchableOpacity>
						)}
					</View>

					{/* Complaint Info */}
					<Text
						className="font-bold text-sm "
						style={{ color: textColor }}
					>
						Complaint ID:{" "}
						<Text style={{ color: textColor }}>
							{complaint?.cid}
						</Text>
					</Text>
					<Text
						className="text-sm text-gray-700 mt-2"
						style={{ color: textColor }}
					>
						Raised On:{" "}
						<Text
							className="font-medium text-black"
							style={{ color: textColor }}
						>
							{complaint?.raisedDate}
						</Text>
					</Text>
					<Text
						className="text-sm text-gray-700"
						style={{ color: textColor }}
					>
						Corporation Response:{" "}
						<Text
							className="font-medium text-black"
							style={{ color: textColor }}
						>
							{complaint?.responseDate}
						</Text>
					</Text>
					<Text
						className="text-sm text-gray-700"
						style={{ color: textColor }}
					>
						Resolved On:{" "}
						<Text
							className="font-medium text-black"
							style={{ color: textColor }}
						>
							{complaint?.resolvedDate}
						</Text>
					</Text>
				</View>
			</View>
		</Modal>
	);
}
const styles = StyleSheet.create({
	imageRow: {
		flexDirection: "row",
		height: 160,
		borderRadius: 12,
		overflow: "hidden",
		marginVertical: 35,
	},
	imageHalf: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	imageHalfTouchable: {
		flex: 1, // Ensure touchable area fills its half
	},
});
