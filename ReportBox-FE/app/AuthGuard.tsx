import { toastConfig } from "@/components/toastConfig";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AlertContainer } from "rn-custom-alert-prompt";

const AuthGuard = () => {
	const { session } = useAuth();
	const { theme } = useThemeContext();
	const { secondaryColor, textColor } = useAppTheme();

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					gestureDirection: "vertical",
					contentStyle: { backgroundColor: secondaryColor },
					statusBarAnimation: "fade",
				}}
			>
				<Stack.Screen
					name="index"
					options={{ headerShown: false, animation: "fade" }}
				/>
				<Stack.Protected guard={!session}>
					<Stack.Screen
						name="(public)"
						options={{
							headerShown: false,
							animation: "simple_push",
							animationTypeForReplace: "push",
						}}
					/>
				</Stack.Protected>
				<Stack.Protected guard={!!session}>
					<Stack.Screen
						name="(protected)"
						options={{
							headerShown: false,
							animation: "simple_push",
							animationTypeForReplace: "push",
						}}
					/>
				</Stack.Protected>
				<Stack.Screen name="+not-found" />
			</Stack>
			<AlertContainer
				animationType="fade"
				appearance={theme}
				theme="ios"
				personalTheme={{
					cardBackgroundColor: secondaryColor,
					titleColor: textColor,
					descriptionColor: "#ccc",
					backgroundColor: "rgba(128,128,128,0.4)",
				}}
			/>
			<Toast
				config={toastConfig}
				position="top"
				swipeable
				visibilityTime={3000}
				topOffset={10}
				avoidKeyboard
				autoHide
			/>
		</>
	);
};
export default AuthGuard;
