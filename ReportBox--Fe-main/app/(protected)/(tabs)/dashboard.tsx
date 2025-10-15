import { getLocationDetails } from "@/components/native/Map";
import { bannersImageUrls } from "@/constants/banners";
import { Dashboard_Categories } from "@/constants/complaints";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	InteractionManager,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const getWeatherIcon = (code: number, size = 24) => {
	if (code === 0)
		return (
			<MaterialCommunityIcons
				name="weather-sunny"
				size={size}
				color="#FDB813"
			/>
		); // sunny yellow
	if (code === 1)
		return (
			<MaterialCommunityIcons
				name="weather-partly-cloudy"
				size={size}
				color="#FFD966"
			/>
		); // partly cloudy
	if (code === 2)
		return (
			<MaterialCommunityIcons
				name="weather-cloudy"
				size={size}
				color="#A0AEC0"
			/>
		); // cloudy gray
	if (code === 3)
		return (
			<MaterialCommunityIcons
				name="weather-cloudy"
				size={size}
				color="#718096"
			/>
		); // darker cloudy
	if (code >= 45 && code <= 48)
		return (
			<MaterialCommunityIcons
				name="weather-fog"
				size={size}
				color="#CBD5E0"
			/>
		); // fog light gray
	if (code >= 51 && code <= 67)
		return (
			<MaterialCommunityIcons
				name="weather-rainy"
				size={size}
				color="#3182CE"
			/>
		); // rainy blue
	if (code >= 71 && code <= 77)
		return (
			<MaterialCommunityIcons
				name="weather-snowy"
				size={size}
				color="#E2E8F0"
			/>
		); // snowy white
	if (code >= 95)
		return (
			<MaterialCommunityIcons
				name="weather-lightning"
				size={size}
				color="#F6E05E"
			/>
		); // lightning yellow
	return <MaterialCommunityIcons name="earth" size={size} color="#00EEFF" />; // default earth icon
};

async function getWeather({ latitude, longitude }: any) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

const DashboardItem = ({
	item,
	cardsColor,
	textColor,
	primaryColor,
	router,
	setGlobalLoading,
}: any) => {
	const [iconLoaded, setIconLoaded] = useState(false);

	// Simulate icon loading
	useEffect(() => {
		const timer = setTimeout(() => {
			setIconLoaded(true); // Show icon after short delay
		}, 300); // 300ms delay, adjust as needed
		return () => clearTimeout(timer);
	}, []);

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				if (item.route) {
					setGlobalLoading(true);
					InteractionManager.runAfterInteractions(() => {
						router.push(item.route);
					});
				}
			}}
		>
			<View
				style={[
					styles.iconCircle,
					{
						backgroundColor: cardsColor,
						borderColor: primaryColor,
						borderWidth: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				]}
			>
				{!iconLoaded && (
					<ActivityIndicator
						size="small"
						color={primaryColor}
						style={{ position: "absolute" }}
					/>
				)}
				{iconLoaded &&
					React.cloneElement(item.icon, { color: primaryColor })}
			</View>
			<Text
				style={[
					styles.label,
					{
						color: textColor,
						fontWeight: "500",
					},
				]}
			>
				{item.label}
			</Text>
		</TouchableOpacity>
	);
};
const ComplaintCategoriesScreen = () => {
	const router = useRouter();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [weather, setWeather] = useState<any>(null);
	const [refreshing, setRefreshing] = useState(false);

	/* -------------------------------------------------------------------------- */
	const onRefresh = async () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		const fetchLocation = async () => {
			const { geo, loc }: any = await getLocationDetails();
			const data = await getWeather({
				latitude: loc?.coords?.latitude,
				longitude: loc?.coords?.longitude,
			});
			setWeather(data?.current_weather);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* --------------------------------- Return --------------------------------- */
	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<FlatList
				data={Dashboard_Categories}
				numColumns={3}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				extraData={[cardsColor, textColor, primaryColor]}
				// renderItem={({ item }: any) => (
				// 	<TouchableOpacity
				// 		style={styles.item}
				// 		onPress={() => {
				// 			if (item.route) {
				// 				setGlobalLoading(true);
				// 				InteractionManager.runAfterInteractions(() => {
				// 					router.push(item.route);
				// 				});
				// 			}
				// 		}}
				// 	>
				// 		<View
				// 			style={[
				// 				styles.iconCircle,
				// 				{
				// 					backgroundColor: cardsColor,
				// 					borderColor: primaryColor,
				// 					borderWidth: 1,
				// 				},
				// 			]}
				// 		>
				// 			{React.cloneElement(item.icon, {
				// 				color: primaryColor,
				// 			})}
				// 		</View>
				// 		<Text
				// 			style={[
				// 				styles.label,
				// 				{
				// 					color: textColor,
				// 					fontWeight: "500",
				// 				},
				// 			]}
				// 		>
				// 			{item.label}
				// 		</Text>
				// 	</TouchableOpacity>
				// )}
				renderItem={({ item }) => (
					<DashboardItem
						item={item}
						cardsColor={cardsColor}
						textColor={textColor}
						primaryColor={primaryColor}
						router={router}
						setGlobalLoading={setGlobalLoading}
					/>
				)}
				ListHeaderComponent={
					<View style={{ marginBottom: 20 }}>
						<View style={{ height: 200, marginBottom: 10 }}>
							<Swiper
								showsPagination
								autoplay
								autoplayTimeout={3}
								dotColor="#ccc"
								activeDotColor={primaryColor}
								style={{ borderRadius: 15 }}
							>
								{bannersImageUrls.map((uri, index) => (
									<Image
										key={index}
										source={{ uri }}
										style={{
											width: "100%",
											height: 200,
											borderRadius: 15,
										}}
										resizeMode="cover"
									/>
								))}
							</Swiper>
						</View>

						{weather && (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									backgroundColor: cardsColor,
									padding: 10,
									borderRadius: 10,
									marginHorizontal: 5,
									marginBottom: 10,
								}}
							>
								<Text
									style={{
										fontSize: 14,
										fontWeight: "600",
										color: primaryColor,
										marginRight: 6,
									}}
								>
									Live Weather
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{getWeatherIcon(weather.weathercode)}
									<Text
										style={{
											fontSize: 14,
											color: primaryColor,
											marginLeft: 6,
											fontWeight: "600",
										}}
									>
										{weather.temperature}°C
									</Text>
								</View>
							</View>
						)}
					</View>
				}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl
						colors={[primaryColor, textColor]}
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressBackgroundColor={secondaryColor}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default ComplaintCategoriesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 6,
		paddingHorizontal: 6,
		marginTop: 90,
	},
	listContent: {
		paddingBottom: 100,
		paddingHorizontal: 10,
		gap: 20,
	},
	item: {
		flex: 1 / 3,
		alignItems: "center",
		marginBottom: 25,
	},
	iconCircle: {
		borderRadius: 50,
		padding: 20,
		marginBottom: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 12,
		textAlign: "center",
	},
});
