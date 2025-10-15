import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function WelcomeCard() {
	const router = useRouter();
	const { primaryColor, textColor, secondaryColor, cardsColor } =
		useAppTheme();

	return (
		<View>
			<Text
				className="text-3xl font-semibold"
				style={{ color: textColor }}
			>
				Welcome to{" "}
				<Text className=" font-bold" style={{ color: primaryColor }}>
					Report Box
				</Text>
			</Text>

			<Text
				className=" text-3xl font-semibold mt-4"
				style={{ color: textColor }}
			>
				Your Voice, Heard
			</Text>

			<Text className="text-gray-400 text-md mt-1">
				Transforming Complaints into solution
			</Text>

			<TouchableOpacity
				className="flex-row items-center justify-end mt-28 "
				onPress={() => router.replace("/(public)/sign-in")}
			>
				<Text className="text-2xl mr-2" style={{ color: textColor }}>
					Continue
				</Text>

				<View
					className=" rounded-full p-2"
					style={{
						backgroundColor: primaryColor,
					}}
				>
					<AntDesign name="arrowright" size={24} color="#fff" />
				</View>
			</TouchableOpacity>
		</View>
	);
}
export default function WelcommeScreen() {
	return (
		<WaveHeaderScreen
			// headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			headerImageUri="https://images.unsplash.com/photo-1543842025-c7fc5de13626?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxtdW5pY2lwYWwlMjBzdHJlZXQlMjBjbGVhbmluZ3xlbnwwfHwwfHx8MA%3D%3D"
			imageContainerHeight={0.59}
			svgStyle={{ opacity: 1 }}
		>
			<WelcomeCard />
		</WaveHeaderScreen>
	);
}
