import { registerForPushNotificationsAsync } from "@/components/NotificationWrapper";
import CustomSwitch from "@/components/ui/CustomSwitch";
import RoundedButton from "@/components/ui/RoundedButton";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	deleteTokenByUserId,
	getTokensByUserID,
	sendOrUpdateToken,
} from "@/services/push-notification.service";
import { getMMKV, MMKV_KEYS, setMMKV } from "@/storage/mmkv";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const SettingsPanel = () => {
	const { logout, user } = useAuth();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const { theme, mode, setThemeMode } = useThemeContext();

	/* -------------------------------------------------------------------------- */
	const [language, setLanguage] = useState("en");
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);
	/* -------------------------------------------------------------------------- */

	// Inside your SettingsPanel component
	const handleToggleNotifications = async (value: boolean) => {
		setNotificationsEnabled(value);
		setMMKV(MMKV_KEYS.NOTIFICATION_STATUS_KEY, value);

		if (value) {
			try {
				const token = await registerForPushNotificationsAsync();
				await sendOrUpdateToken(user.user._id, token);
				Toast.show({ type: "info", text1: "Enable Notification" });
			} catch (error) {
				console.error("Failed to register notifications:", error);
			}
		} else {
			try {
				await deleteTokenByUserId(user.user._id);
				Toast.show({ type: "info", text1: "Disable Notification" });
			} catch (err: any) {
				Toast.show({
					type: "error",
					text1: "Failed to disable notifications. Please try again.",
				});
			}
		}
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		const loadNotificationStatus = async () => {
			try {
				// 1. First check local MMKV
				const status = getMMKV(MMKV_KEYS.NOTIFICATION_STATUS_KEY);
				if (typeof status === "boolean") {
					setNotificationsEnabled(status);
					return;
				}

				// 2. If not found in MMKV → fetch from API
				const response: any = await getTokensByUserID(user.user._id);

				if (response?.tokens && response.tokens.length > 0) {
					setNotificationsEnabled(true);
					setMMKV(MMKV_KEYS.NOTIFICATION_STATUS_KEY, true);
				} else {
					setNotificationsEnabled(false);
					setMMKV(MMKV_KEYS.NOTIFICATION_STATUS_KEY, false);
				}
			} catch (error) {
				console.error("Failed to load notification status:", error);
				setNotificationsEnabled(false);
			}
		};

		loadNotificationStatus();
	}, [user.user._id]);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */
	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
				paddingTop: 40,
			}}
		>
			{/* Theme */}
			<View className="mb-8 flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Ionicons name="moon" size={25} color={textColor} />
					<Text className="text-lg" style={{ color: textColor }}>
						Theme
					</Text>
				</View>
				<View className="flex-row gap-2">
					{["light", "dark", "system"].map((option: any) => (
						<TouchableOpacity
							key={option}
							style={{
								borderWidth: 1,
								borderRadius: 6,
								paddingVertical: 4,
								paddingHorizontal: 12,
								backgroundColor:
									mode === option
										? primaryColor
										: secondaryColor,
								borderColor:
									mode === option ? primaryColor : textColor,
							}}
							onPress={() => setThemeMode(option)}
						>
							<Text
								style={{
									color:
										mode === option
											? cardsColor
											: textColor,
									fontWeight: mode === option ? "600" : "400",
									textTransform: "capitalize",
								}}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Notifications */}
			<View className="flex-row items-center justify-between mb-8">
				<View className="flex-row items-center gap-3">
					<Feather name="bell" size={25} color={textColor} />
					<Text className="text-lg" style={{ color: textColor }}>
						Notifications
					</Text>
				</View>
				<CustomSwitch
					isEnabled={notificationsEnabled}
					setIsEnabled={handleToggleNotifications}
				/>
			</View>

			{/* Language */}
			{/* <View className="flex-row items-center justify-between mb-12">
				<View className="flex-row items-center gap-3">
					<Feather name="globe" size={25} color={textColor} />
					<Text className="text-lg" style={{ color: textColor }}>
						Language
					</Text>
				</View>
				<View className="flex-row gap-2">
					{[
						{ code: "hi", label: "Hindi" },
						{ code: "en", label: "English" },
					].map((lang) => (
						<TouchableOpacity
							key={lang.code}
							style={{
								borderWidth: 1,
								borderRadius: 6,
								paddingVertical: 2,
								paddingHorizontal: 8,
								backgroundColor:
									language === lang.code
										? primaryColor
										: secondaryColor,
								borderColor:
									language === lang.code
										? primaryColor
										: textColor,
							}}
							onPress={() => setLanguage(lang.code)}
						>
							<Text
								style={{
									color:
										language === lang.code
											? cardsColor
											: textColor,
									fontWeight:
										language === lang.code ? "600" : "400",
								}}
							>
								{lang.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View> */}

			{/* Logout */}
			<RoundedButton
				title={"Log Out"}
				onPress={() => {
					logout();
				}}
			/>
		</View>
	);
};
export default SettingsPanel;
