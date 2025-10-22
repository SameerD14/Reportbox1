import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const Initial = () => {
	const { session, isLoading } = useAuth();
	const { primaryColor, secondaryColor } = useAppTheme();

	if (isLoading) {
		return (
			<View
				className="flex-1 items-center justify-center "
				style={{ backgroundColor: secondaryColor }}
			>
				<ActivityIndicator size="large" color={primaryColor} />
			</View>
		);
	}
	return session ? (
		<Redirect href={"/(protected)/(tabs)/dashboard"} />
	) : (
		<Redirect href={"/(public)/welcome"} />
	);
};

export default Initial;
