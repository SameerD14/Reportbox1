import { useAuth } from "@/contexts/AuthContext";
import { useImagePreview } from "@/contexts/ImagePreviewContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useUserAccess } from "@/hooks/useUserAccess";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import {
	Image,
	InteractionManager,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const menuItems: {
	label: string;
	icon: string;
	path: Href;
	right?: string;
}[] = [
	{
		label: "Home",
		icon: "home-outline",
		path: "/(protected)/(tabs)/dashboard",
		right: "dashboard",
	},
	{
		label: "Profile",
		icon: "person-outline",
		path: "/(protected)/profile",
		right: "profile_view",
	},
	{
		label: "History",
		icon: "archive-outline",
		path: "/(protected)/(tabs)/complaints/history",
		right: "history_view",
	},
	{
		label: "Help",
		icon: "help-buoy-outline",
		path: "/(protected)/settings/help",
		right: "help_view",
	},
	{
		label: "Settings",
		icon: "settings-outline",
		path: "/(protected)/settings",
		right: "settings",
	},
];
const CustomDrawer = (props: any) => {
	const { navigation } = props;
	const segments = useSegments();
	const { logout, user } = useAuth();
	const { hasRight } = useUserAccess();
	const { showImage } = useImagePreview();
	const segmentPath = "/" + segments.join("/");
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor } = useAppTheme();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<View style={[styles.header, { borderBottomColor: textColor }]}>
				<Pressable
					onPress={() => showImage(user?.user?.avatar)}
					style={{
						borderWidth: 3,
						width: 90,
						height: 90,
						borderRadius: 45,
						borderColor: primaryColor,
						overflow: "hidden",
						marginBottom: 2,
					}}
				>
					<Image
						source={{
							uri: user?.user?.avatar,
						}}
						style={styles.profileImage}
					/>
				</Pressable>
				<TouchableOpacity
					style={{ alignItems: "center" }}
					onPress={() => {
						if (navigation?.closeDrawer) {
							navigation.closeDrawer();
						}
						if (segmentPath !== "/(protected)/profile") {
							setGlobalLoading(true);
							InteractionManager.runAfterInteractions(() => {
								router.push("/(protected)/profile");
							});
						}
					}}
				>
					<Text style={[styles.username, { color: textColor }]}>
						{user?.user?.name}
					</Text>
					<Text style={[styles.email, { color: textColor }]}>
						{user?.user?.email}
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				contentContainerStyle={styles.menuContainer}
				showsVerticalScrollIndicator={false}
			>
				{menuItems
					.filter((item) => !item.right || hasRight(item.right))
					.map((item) => (
						<TouchableOpacity
							key={item.label}
							style={styles.customItem}
							onPress={() => {
								if (navigation?.closeDrawer) {
									navigation.closeDrawer();
								}
								if (segmentPath !== item.path) {
									setGlobalLoading(true);
									InteractionManager.runAfterInteractions(
										() => {
											router.push(item.path);
										}
									);
								}
							}}
						>
							<Ionicons
								name={item.icon as any}
								size={22}
								color={textColor}
							/>
							<Text
								style={[styles.itemText, { color: textColor }]}
							>
								{" "}
								{item.label}
							</Text>
						</TouchableOpacity>
					))}
				<View style={[styles.footer, { borderTopColor: textColor }]}>
					<TouchableOpacity
						style={styles.logoutButton}
						onPress={() => {
							logout();
						}}
					>
						<Ionicons
							name="log-out-outline"
							size={22}
							color="#FF6347"
						/>
						<Text style={[styles.itemText, { color: "#FF6347" }]}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default function RootDrawerLayout() {
	const { secondaryColor } = useAppTheme();

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerPosition: "left", // Optional: if you want right-side drawer
				drawerStyle: {
					width: "80%", // Control drawer width
					backgroundColor: secondaryColor,
				},
				overlayColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
		></Drawer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingVertical: 24,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		alignItems: "center",
	},
	profileImage: {
		width: "100%",
		height: "100%",
	},
	username: {
		fontSize: 18,
		fontWeight: "600",
	},
	email: {
		fontSize: 14,
		opacity: 0.6,
	},
	menuContainer: {
		padding: 10,
	},
	customItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		marginLeft: 10,
		gap: 12,
	},
	itemText: {
		fontSize: 16,
	},
	footer: {
		borderTopWidth: 1,
		padding: 16,
		marginTop: 10,
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
});
