import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function ComplaintSuccessModal({
	cID,
	titleText = "Complaint Submitted!",
	btntext = "Track Your Complaint",
	visible,
	onClose,
	onTrack,
}: any) {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/60 px-4">
				<View
					className="w-full rounded-2xl  p-5 items-center space-y-4"
					style={{
						backgroundColor: secondaryColor,
					}}
				>
					{/* Close Button */}
					<Pressable
						onPress={onClose}
						className="absolute top-3 right-3 p-1 rounded-full"
					>
						<Ionicons name="close" size={22} color={textColor} />
					</Pressable>

					{/* Check Icon */}
					<View
						className=" p-4 rounded-full my-2"
						style={{
							backgroundColor: primaryColor,
						}}
					>
						<Ionicons name="checkmark" size={32} color="white" />
					</View>

					{/* Title */}
					<Text
						className="text-center mb-2 font-bold text-2xl "
						style={{
							color: textColor,
						}}
					>
						{titleText}
					</Text>

					{/* Description */}
					<Text className="text-center text-xs text-gray-500">
						You'll be notified as it progresses{"\n"}through
						resolution.
					</Text>

					{/* Complaint ID */}
					<Text
						className="text-center text-lg my-2 font-medium text-gray-900"
						style={{
							color: textColor,
						}}
					>
						Complaint ID: <Text className="font-bold">{cID}</Text>
					</Text>

					{/* Track Button */}
					<Pressable
						onPress={onTrack}
						className=" px-6 py-2.5 my-3 rounded-full"
						style={{
							backgroundColor: primaryColor,
						}}
					>
						<Text
							className="text-white font-semibold text-lg"
							style={{
								color: cardsColor,
							}}
						>
							{btntext}
						</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
