import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const RoundedButton = ({
	title = "",
	onPress = () => {},
	disabled = false,
	style = {},
	loading = false,
}) => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	return (
		<TouchableOpacity
			className="py-3 my-3 rounded-full"
			style={[
				{ backgroundColor: disabled ? "#aaa" : primaryColor },
				style,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			{loading ? (
				<ActivityIndicator color={secondaryColor} size={"small"} />
			) : (
				<Text
					className="text-center text-lg font-semibold"
					style={{ color: cardsColor }}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default RoundedButton;
