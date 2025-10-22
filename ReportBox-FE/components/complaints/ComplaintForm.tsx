import { complaintTypes } from "@/constants/complaints";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	AntDesign,
	Entypo,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { getLocationDetails } from "../native/Map";
import RoundedButton from "../ui/RoundedButton";
const ICON_MAP: any = {
	AntDesign,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
	Entypo,
};

export default function ComplaintForm({
	type,
	tags,
	setTags,
	location,
	setLocation,
	message,
	setMessage,
	subtypes,
	setComplaintType,
	setComplaintSubtype,
}: any) {
	const [modalVisible, setModalVisible] = useState(false);
	const [expandedType, setExpandedType] = useState<string | null>(
		type || null
	);
	const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>([]);
	/* -------------------------------------------------------------------------- */
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	const toggleSubtype = (subtype: string) => {
		if (!expandedType) return;

		//single
		setSelectedSubtypes((prev: any) =>
			prev[0] === subtype ? [] : [subtype]
		);
		setComplaintType(expandedType);
		setComplaintSubtype(subtype);
		// multi select
		// setSelectedSubtypes((prev: any) =>
		// 	prev.includes(subtype)
		// 		? prev.filter((s: any) => s !== subtype)
		// 		: [...prev, subtype]
		// );
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		if (Array.isArray(subtypes)) {
			setSelectedSubtypes(subtypes);
		} else if (typeof subtypes === "string" && subtypes.trim() !== "") {
			setSelectedSubtypes([subtypes]);
		} else {
			setSelectedSubtypes([]);
		}
	}, [subtypes]);
	useEffect(() => {
		setExpandedType(type || null);
	}, [type]);
	/* -------------------------------------------------------------------------- */
	return (
		<View style={{ flex: 1, padding: 10 }}>
			{/* Complaint Type Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Complaint Type
			</Text>
			<TouchableOpacity
				style={[styles.field, { backgroundColor: cardsColor }]}
				onPress={() => setModalVisible(true)}
			>
				<Text
					style={{
						color: selectedSubtypes?.length ? textColor : "#999",
					}}
				>
					{`${expandedType ? expandedType : "Type"} \t : \t`}
					{Array.isArray(selectedSubtypes) &&
					selectedSubtypes.length > 0
						? selectedSubtypes.join(", ")
						: "Select complaint type"}
				</Text>
			</TouchableOpacity>

			{/* Location Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Your Location
			</Text>
			<View style={[styles.field, { backgroundColor: cardsColor }]}>
				<Text
					style={{ color: textColor }}
					onPress={async () => {
						const { geo, loc }: any = await getLocationDetails();
						setLocation(geo[0]?.formattedAddress);
					}}
				>
					{location}
				</Text>
			</View>

			{/* Explanation Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Explain your issue
			</Text>
			<TextInput
				multiline
				numberOfLines={4}
				placeholder="Describe your complaint here"
				style={[
					styles.textArea,
					{ color: textColor, backgroundColor: cardsColor },
				]}
				value={message}
				onChangeText={setMessage}
			/>
			<Text style={[styles.label, { color: textColor }]}>Hash Tags</Text>
			<TextInput
				multiline
				numberOfLines={3}
				placeholder="Add tags..."
				style={[
					styles.field,
					{ color: textColor, backgroundColor: cardsColor },
				]}
				value={tags}
				onChangeText={setTags}
			/>
			{/* Complaint Modal */}
			<Modal
				visible={modalVisible}
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<View
					style={{
						flex: 1,
						padding: 10,
						backgroundColor: secondaryColor,
						paddingTop: 20,
					}}
				>
					<Text style={[styles.modalTitle, { color: textColor }]}>
						Select Complaint Type
					</Text>

					<ScrollView showsVerticalScrollIndicator={false}>
						{complaintTypes?.map((item: any, index) => {
							const IconType = ICON_MAP[item.iconType];
							return (
								<View key={index}>
									<TouchableOpacity
										style={[
											styles.typeItem,
											{ backgroundColor: cardsColor },
										]}
										onPress={() =>
											setExpandedType(
												expandedType === item.label
													? null
													: item.label
											)
										}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											{IconType && (
												<IconType
													name={item.icon}
													size={20}
													color={primaryColor}
													style={{ marginRight: 10 }}
												/>
											)}
											<Text
												style={[
													styles.typeText,
													{ color: textColor },
												]}
											>
												{item.label}
											</Text>
										</View>
										<AntDesign
											name={
												expandedType === item.label
													? "up"
													: "down"
											}
											size={18}
											color="#ccc"
										/>
									</TouchableOpacity>

									{expandedType === item.label && (
										<View
											style={{
												marginLeft: 10,
												marginTop: 5,
											}}
										>
											{item.categories.map(
												(sub: any, i: any) => {
													const SubIcon =
														ICON_MAP[sub.iconType];
													return (
														<TouchableOpacity
															key={i}
															style={[
																styles.subtypeItem,
																,
																{
																	backgroundColor:
																		selectedSubtypes.includes(
																			sub.label
																		)
																			? primaryColor
																			: cardsColor,
																},
															]}
															onPress={() =>
																toggleSubtype(
																	sub.label
																)
															}
														>
															<View
																style={{
																	flexDirection:
																		"row",
																	alignItems:
																		"center",
																}}
															>
																{SubIcon && (
																	<SubIcon
																		name={
																			sub.icon
																		}
																		size={
																			18
																		}
																		color={
																			selectedSubtypes.includes(
																				sub.label
																			)
																				? secondaryColor
																				: primaryColor
																		}
																		style={{
																			marginRight: 8,
																		}}
																	/>
																)}
																<Text
																	style={{
																		color: selectedSubtypes.includes(
																			sub.label
																		)
																			? secondaryColor
																			: textColor,
																	}}
																>
																	{sub.label}
																</Text>
															</View>
														</TouchableOpacity>
													);
												}
											)}
										</View>
									)}
								</View>
							);
						})}
					</ScrollView>

					{/* Done Button */}

					<RoundedButton
						title={"Done"}
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 6,
		fontWeight: "bold",
	},
	field: {
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 5,
		marginVertical: 10,
	},
	textArea: {
		padding: 12,
		borderRadius: 8,
		height: 100,
		marginVertical: 10,
		textAlignVertical: "top",
		color: "#ccc",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#ccc",
	},
	typeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 3,
		marginBottom: 5,
	},
	typeText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#ccc",
	},
	subtypeItem: {
		backgroundColor: "#1e1e1e",
		padding: 10,
		borderRadius: 5,
		marginVertical: 4,
	},

	closeButton: {
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 20,
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
