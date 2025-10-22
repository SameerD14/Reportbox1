import { Image, Text, TouchableOpacity, View } from "react-native";

import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
function VerificationSuccessScreen() {
	const router = useRouter();
	const { primaryColor, textColor } = useAppTheme();
	return (
		<View className="flex-1 relative justify-center">
			{/* Other content below */}
			<View className="px-2 items-center pt-6">
				<Text
					className="text-xl font-bold mb-3 text-center"
					style={{ color: textColor }}
				>
					Report Issues Instantly
				</Text>

				<Text className="text-gray-500 text-md mb-10 text-center">
					Spotted a problem? Submit complaints quickly by describing
					the issue, adding photos, and choosing a location.
				</Text>

				<TouchableOpacity
					className="flex-row items-center space-x-2"
					onPress={() => {
						router.replace("/(public)/sign-in/profile-form");
					}}
				>
					<Text
						className="  text-2xl font-semibold"
						style={{ color: textColor }}
					>
						Let’s complete your profile
					</Text>
					<View
						className=" rounded-full p-2 ml-1"
						style={{
							backgroundColor: primaryColor,
						}}
					>
						<AntDesign name="arrowright" size={22} color="#fff" />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const Verified = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const floatingCard = (
		<View className="bg-white rounded-3xl mb-2 p-6 w-72 items-center shadow-lg">
			<Text
				className="text-center text-2xl font-bold  mb-2"
				style={{
					color: textColor,
				}}
			>
				You’ve been verified
			</Text>
			<Image
				source={{
					uri: "https://media.istockphoto.com/id/2150831290/vector/3d-handshake-hold-hands-with-blue-sleeve-vector-icon-cartoon-partnership-arm-gesture.jpg?s=612x612&w=0&k=20&c=_M9LSLypat10SHh_h6hpPQOzjmnotUq43hL0Lww1Q5g=",
				}}
				// source={require("@/assets/Handshake.gif")}
				height={150}
				width={200}
				resizeMode="stretch"
			/>
		</View>
	);
	return (
		<WaveHeaderScreen
			headerImageUri="https://plus.unsplash.com/premium_photo-1683842190286-204c3d93a5f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVyaWZpZWR8ZW58MHwxfDB8fHww"
			imageContainerHeight={0.6}
			svgStyle={{ opacity: 1 }}
			floatingOverlay={floatingCard}
		>
			<VerificationSuccessScreen />
		</WaveHeaderScreen>
	);
};

export default Verified;
