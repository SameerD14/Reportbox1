import { SpecialTabButton } from "@/components/SpecialTabButton";
import StackHeader from "@/components/ui/StackHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const TabLayout = () => {
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	const MemoizedStackHeader = React.memo(StackHeader);

	return (
		<Tabs
			initialRouteName="dashboard"
			backBehavior="history"
			screenOptions={{
				lazy: true, // Enable lazy loading
				tabBarActiveTintColor: primaryColor,
				tabBarInactiveTintColor: "#727272",
				tabBarBadgeStyle: {
					backgroundColor: "#ccc",
					color: cardsColor,
					fontSize: 10,
				},
				headerPressOpacity: 1,
				tabBarIconStyle: {
					marginVertical: 13,
					opacity: 1,
				},
				animation: "none",
				tabBarStyle: {
					position: "absolute",
					bottom: 10,
					left: 20,
					right: 20,
					height: 70,
					backgroundColor: cardsColor,
					borderRadius: 35,
					borderTopWidth: 0,
					elevation: 0,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
					paddingHorizontal: 20,
					marginBottom: 20,
					marginHorizontal: 20,
					opacity: 1,
				},
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home"
							color={color}
							size={size}
							activeOpacity={1}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					tabBarBadge: undefined,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				}}
			/>
			<Tabs.Screen
				name="complaints/index"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						// <Ionicons name="search" color={color} size={size} />
						<MaterialIcons
							name="dynamic-feed"
							color={color}
							size={size}
							activeOpacity={1}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				}}
			/>

			<Tabs.Screen
				name="complaints/create"
				options={{
					href: null,
					animation: "fade",
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
			<Tabs.Screen
				name="complaints/view/[id]"
				options={{
					href: null,
					animation: "fade",
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
			<Tabs.Screen
				name="complaints/edit/[id]"
				options={{
					href: null,
					animation: "fade",
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>

			<Tabs.Screen
				name="hidden"
				options={{
					title: "",
					tabBarLabel: "",
					tabBarButton: SpecialTabButton,
				}}
			/>

			<Tabs.Screen
				name="notifications"
				listeners={{
					tabPress: (e) => {
						// e.preventDefault();
						// navigation.dispatch(DrawerActions.openDrawer());
						// route.push("/");
					},

					tabLongPress: () => {},
				}}
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="notifications"
							color={color}
							size={size}
							activeOpacity={1}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				}}
			/>
			<Tabs.Screen
				name="complaints/progress"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chat-alert"
							color={color}
							size={size}
							activeOpacity={1}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader
								onmenuTitlePress={() =>
									router.push(
										"/(protected)/(tabs)/complaints/history"
									)
								}
							/>
						</SafeAreaView>
					),
				}}
			/>
			<Tabs.Screen
				name="complaints/history"
				options={{
					href: null,
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader
								showThreeDots={false}
								showBackIcon={true}
								showMenuDrawer={false}
							/>
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
			<Tabs.Screen
				name="complaints/type/[id]"
				options={{
					href: null,
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
			<Tabs.Screen
				name="complaints/contact/[id]"
				options={{
					href: null,
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<MemoizedStackHeader showThreeDots={false} />
						</SafeAreaView>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
{
	/* <Tabs.Screen
				name="test"
				options={{
					href: null,
					headerShown: true,
					tabBarStyle: { display: "none" },
				}}
			/> */
}
