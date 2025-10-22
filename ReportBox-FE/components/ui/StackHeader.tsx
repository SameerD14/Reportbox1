import { useAppTheme } from "@/hooks/useAppTheme";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import WavyHeaderBackground from "../svg/WavyHeaderBackground";

interface StackHeaderProps {
	showMenuDrawer?: boolean;
	showThreeDots?: boolean;
	onmenuTitlePress?: any;
	menuTitle?: string;
	showBackIcon?: boolean;
	title?: string;
	backIconTitle?: string;
}
const StackHeader = ({
	showMenuDrawer = true,
	showThreeDots = true,
	onmenuTitlePress = () => {},
	menuTitle = "Complaint History",
	showBackIcon = false,
	backIconTitle = "",
	title = "",
}: StackHeaderProps) => {
	const navigation = useNavigation();
	const [menuVisible, setMenuVisible] = useState(false);
	const { primaryColor, secondaryColor, cardsColor } = useAppTheme();

	return (
		<View
			style={{
				backgroundColor: primaryColor,
				height: 80,
				marginTop: 30,
				justifyContent: "center",
				position: "relative",
			}}
		>
			{showMenuDrawer && (
				<Pressable
					onPress={() =>
						navigation.dispatch(DrawerActions.openDrawer())
					}
					style={{
						position: "absolute",
						top: 10,
						left: 16,
						zIndex: 10,
					}}
				>
					<Ionicons name="menu" size={35} color={cardsColor} />
				</Pressable>
			)}
			{/* Back Button */}
			{showBackIcon && (
				<Pressable
					onPress={() => navigation.goBack()}
					style={{
						position: "absolute",
						top: 20,
						left: 20,
						zIndex: 10,
						flex: 1,
						flexDirection: "row",
					}}
				>
					<Ionicons
						name="chevron-back"
						size={30}
						color={cardsColor}
					/>
					<Text
						style={{
							fontSize: 22,
							fontWeight: "bold",
							color: cardsColor, // White text
							// marginBottom: 20,
						}}
					>
						{backIconTitle}
					</Text>
				</Pressable>
			)}
			{title && (
				<Text
					style={{
						position: "absolute",
						top: 10,
						alignSelf: "center",
						fontSize: 25,
						fontWeight: "bold",
						color: "white",
						zIndex: 100,
					}}
				>
					{title}
				</Text>
			)}
			<WavyHeaderBackground />
			{showThreeDots && (
				<Pressable
					onPress={() => setMenuVisible(!menuVisible)}
					style={{
						position: "absolute",
						top: 15,
						right: 16,
						zIndex: 10,
					}}
				>
					<Entypo
						name="dots-three-vertical"
						size={25}
						color={cardsColor}
					/>
				</Pressable>
			)}
			{menuVisible && (
				<View
					// className="absolute bg-white rounded-sm right-5 top-5 shadow p-2"
					style={{
						position: "absolute",
						right: 25,
						top: 40,
						backgroundColor: "#fff",
						borderRadius: 4,
						paddingVertical: 8,
						paddingHorizontal: 12,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
						zIndex: 20,
					}}
				>
					<Pressable
						onPress={() => {
							setMenuVisible(!menuVisible);
							onmenuTitlePress();
						}}
						className="p-1"
					>
						<Text
							// className="text-black text-sm font-semibold"
							style={{
								color: "black",
								fontSize: 14,
								fontWeight: "600",
							}}
						>
							{menuTitle}
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default StackHeader;
