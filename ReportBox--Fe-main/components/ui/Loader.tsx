import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
	const { secondaryColor, primaryColor } = useAppTheme();

	return (
		<View
			className="flex-1 items-center justify-center "
			style={{ backgroundColor: secondaryColor }}
		>
			<ActivityIndicator size="large" color={primaryColor} />
		</View>
	);
};

export default Loader;
