import { useAppTheme } from "@/hooks/useAppTheme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const SpecialTabButton = () => {
	const { primaryColor } = useAppTheme();
	const router = useRouter();
	const handlePress = () => {
		router.push("/(protected)/(tabs)/complaints/create");
	};
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.9}
			style={styles.button}
		>
			<View
				style={[
					styles.innerCircle,
					{
						backgroundColor: primaryColor,
						shadowColor: primaryColor,
					},
				]}
			>
				<AntDesign name="plus" size={30} color="#fff" />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		top: -20,
		justifyContent: "center",
		alignItems: "center",
	},
	innerCircle: {
		width: 50,
		height: 50,
		borderRadius: 35,
		// purple
		justifyContent: "center",
		alignItems: "center",
		elevation: 8,

		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
	},
});
