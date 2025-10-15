import Blob from "@/components/on-bording/blob";
import { contactLists } from "@/constants/complaints";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmergencyContactScreen = () => {
	const { id } = useLocalSearchParams();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { cardsColor, primaryColor, textColor, secondaryColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	const [contactList, setContactList] = useState<any>([]);
	/* -------------------------------------------------------------------------- */
	const handleCall = (number: string) => {
		Linking.openURL(`tel:${number}`);
	};
	const renderItem = ({ item }: { item: (typeof contactList)[0] }) => (
		<TouchableOpacity
			style={[styles.itemContainer, { backgroundColor: cardsColor }]}
			onPress={() => handleCall(item?.phone)}
			activeOpacity={0.8}
		>
			<View style={[styles.iconBox, { borderColor: primaryColor }]}>
				{React.cloneElement(item?.icon, { color: primaryColor })}
			</View>
			<Text style={[styles.label, { color: textColor }]}>
				{item?.label}
			</Text>
			<FontAwesome name="phone" size={20} color={primaryColor} />
		</TouchableOpacity>
	);

	/* -------------------------------------------------------------------------- */

	useEffect(() => {
		setGlobalLoading(false);

		const setHelplineContacts = (category: string) => {
			const list = contactLists[category] ?? [];
			setContactList(list);
		};

		if (id) {
			setHelplineContacts(id as any);
		}
	}, [isFocused, id]);
	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<LegendList
				data={contactList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.list}
				extraData={[cardsColor, textColor, primaryColor]}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				estimatedItemSize={25}
				recycleItems
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob text={"Not Found !"} iconName={"alert-sharp"} />
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
	list: {
		paddingBottom: 40,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	iconBox: {
		width: 35,
		height: 35,
		borderRadius: 20,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 16,
	},
	label: {
		flex: 1,
		fontSize: 16,
		fontWeight: "500",
	},
});
