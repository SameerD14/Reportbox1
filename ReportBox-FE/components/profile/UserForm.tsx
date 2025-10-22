import { useAuth } from "@/contexts/AuthContext";
import { useImagePreview } from "@/contexts/ImagePreviewContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { updateProfile } from "@/services/auth.service";
import {
	Entypo,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CameraScreen, { handleImageChoice } from "../native/CameraScreen";
import CustomAlert from "../ui/CustomAlert";
import RoundedButton from "../ui/RoundedButton";

interface UserFormProps {
	editable?: boolean;
	onlyForm?: boolean;
	id?: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const validateFormData = (formData: any, avatar: any, setAvatar: any) => {
	const { name, phoneNo, gender, state, city, doorNo, street } = formData;

	if (!name?.trim()) {
		Toast.show({ type: "error", text1: "Name is required." });
		return false;
	}
	if (!phoneNo?.trim()) {
		Toast.show({ type: "error", text1: "Phone number is required." });
		return false;
	}
	if (phoneNo.trim().length < 10) {
		Toast.show({
			type: "error",
			text1: "Phone number must be 10 digits.",
		});
		return false;
	}
	if (!gender?.trim()) {
		Toast.show({ type: "error", text1: "Gender is required." });
		return false;
	}
	if (!state?.trim()) {
		Toast.show({ type: "error", text1: "State is required." });
		return false;
	}
	if (!city?.trim()) {
		Toast.show({ type: "error", text1: "City is required." });
		return false;
	}
	if (!doorNo?.trim()) {
		Toast.show({ type: "error", text1: "Door number is required." });
		return false;
	}
	if (!street?.trim()) {
		Toast.show({ type: "error", text1: "Street is required." });
		return false;
	}

	// Avatar check
	if (!avatar || !avatar.trim()) {
		CustomAlert({
			title: "Avatar is required.",
			description: "A default avatar will be used if none is selected.",
			onConfirm() {
				setAvatar("https://avatar.iran.liara.run/public/37");
			},
			onCancel() {
				Toast.show({
					type: "error",
					text1: "Please select an avatar before continuing.",
				});
			},
		});
		return false;
	}

	return true;
};
/* -------------------------------------------------------------------------- */
const UserForm = ({ editable = true, onlyForm = false, id }: UserFormProps) => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { user, data, completeProfile } = useAuth();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const { showImage } = useImagePreview();

	/* -------------------------------------------------------------------------- */
	const [edit, setEdit] = useState(onlyForm);
	const [showCamera, setShowCamera] = useState(false);
	const [formData, setFormData] = useState({
		name: user?.user?.name || "",
		state: user?.user?.state || "",
		doorNo: user?.user?.doorNo || "",
		street: user?.user?.street || "",
		city: user?.user?.city || "",
		phoneNo: user?.user?.phoneNo?.toString() || "",
		gender: user?.user?.gender || "",
		email: user?.user?.email || "",
		UID: user?.user?.UID || "",
	});
	const [avatar, setAvatar] = useState(user?.user?.avatar || "");

	/* -------------------------------------------------------------------------- */
	const handleFormSubmit = async () => {
		if (!validateFormData(formData, avatar, setAvatar)) return;

		try {
			Keyboard.dismiss();
			setGlobalLoading(true);
			const result = await updateProfile(
				id ?? user?.user?._id,
				formData,
				avatar
			);

			if (result) {
				completeProfile(user?.user?._id);
			}

			setTimeout(() => {
				if (!onlyForm) setEdit(false);
			}, 2000);
		} catch (error) {
		} finally {
			setGlobalLoading(false);
		}
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: secondaryColor }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if header overlaps
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<Pressable
						style={{
							position: "absolute",
							top: 10,
							left: 16,
							zIndex: 10,
						}}
						onPress={() => router.back()}
					>
						<Ionicons name="chevron-back" size={24} color="#FFF" />
					</Pressable>
					{/* Background Header */}
					<ImageBackground
						source={{
							uri: "https://images.unsplash.com/photo-1721305254301-bc22475ccf14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFuZHMlMjB0b2dldGhlciUyMGZvciUyMHBsYW50fGVufDB8MHwwfHx8MA%3D%3D",
						}}
						style={styles.headerBg}
						resizeMode="cover"
					>
						{editable && !onlyForm && (
							<Pressable
								style={styles.editButton}
								onPress={() => setEdit(!edit)}
							>
								<MaterialIcons
									name="edit"
									size={24}
									color="#FFF"
								/>
							</Pressable>
						)}

						<View style={styles.profilePicWrapper}>
							<TouchableOpacity
								style={[
									styles.profilePic,
									{ borderColor: primaryColor },
								]}
								onPress={() =>
									showImage(
										avatar.trim() ||
											"https://avatar.iran.liara.run/public/37"
									)
								}
							>
								<Image
									source={{
										uri:
											avatar.trim() ||
											"https://avatar.iran.liara.run/public/37",
									}}
									resizeMode="cover"
									style={styles.profileImage}
								/>
							</TouchableOpacity>
							{(edit || onlyForm) && (
								<TouchableOpacity
									style={[
										styles.addIcon,
										{ borderColor: primaryColor },
									]}
									onPress={() =>
										handleImageChoice(
											setShowCamera,
											setAvatar
										)
									}
								>
									<Ionicons
										name="add"
										size={16}
										color={primaryColor}
									/>
								</TouchableOpacity>
							)}
						</View>
					</ImageBackground>

					{/**Editable form */}
					{edit || onlyForm ? (
						<View
							style={[
								styles.form,
								{ backgroundColor: secondaryColor },
							]}
						>
							<Text style={[styles.label, { color: textColor }]}>
								Name
							</Text>
							<TextInput
								placeholder="Enter your name"
								placeholderTextColor="#aaa"
								style={[
									styles.input,
									{
										backgroundColor: cardsColor,
										color: textColor,
									},
								]}
								value={formData.name}
								onChangeText={(text) =>
									setFormData((prev) => ({
										...prev,
										name: text,
									}))
								}
							/>

							<Text
								style={[
									styles.label,
									{ fontSize: 12, color: textColor },
								]}
							>
								Phone Number
							</Text>
							<TextInput
								placeholder="Enter your phone number"
								placeholderTextColor="#aaa"
								keyboardType="phone-pad"
								style={[
									styles.input,
									{
										backgroundColor: cardsColor,
										color: textColor,
									},
								]}
								value={formData.phoneNo}
								onChangeText={(text) =>
									setFormData((prev) => ({
										...prev,
										phoneNo: text,
									}))
								}
								maxLength={10}
							/>

							<Text
								style={[
									styles.label,
									{ fontSize: 12, color: textColor },
								]}
							>
								Gender
							</Text>
							<View style={styles.genderToggleContainer}>
								{["Male", "Female", "Other"].map((option) => (
									<TouchableOpacity
										key={option}
										style={[
											styles.genderOption,
											{
												backgroundColor:
													formData.gender === option
														? primaryColor
														: cardsColor,
												borderColor: primaryColor,
											},
										]}
										onPress={() =>
											setFormData((prev) => ({
												...prev,
												gender: option,
											}))
										}
									>
										<Text
											style={{
												color:
													formData.gender === option
														? "#fff"
														: textColor,
												fontWeight: "500",
											}}
										>
											{option}
										</Text>
									</TouchableOpacity>
								))}
							</View>

							<Text style={[styles.label, { color: textColor }]}>
								Address
							</Text>

							<View style={styles.row}>
								<View
									style={[
										styles.inputContainer,
										{ flex: 1, marginRight: 8 },
									]}
								>
									<Text
										style={[
											styles.label,
											{ fontSize: 12, color: textColor },
										]}
									>
										State
									</Text>
									<TextInput
										placeholder="Enter your state"
										placeholderTextColor="#aaa"
										style={[
											styles.input,
											{
												backgroundColor: cardsColor,
												color: textColor,
											},
										]}
										value={formData.state}
										onChangeText={(text) =>
											setFormData((prev) => ({
												...prev,
												state: text,
											}))
										}
									/>
								</View>
								<View
									style={[styles.inputContainer, { flex: 1 }]}
								>
									<Text
										style={[
											styles.label,
											{ fontSize: 12, color: textColor },
										]}
									>
										City
									</Text>
									<TextInput
										placeholder="Enter your city"
										placeholderTextColor="#aaa"
										style={[
											styles.input,
											{
												backgroundColor: cardsColor,
												color: textColor,
											},
										]}
										value={formData.city}
										onChangeText={(text) =>
											setFormData((prev) => ({
												...prev,
												city: text,
											}))
										}
									/>
								</View>
							</View>

							<Text
								style={[
									styles.label,
									{ fontSize: 12, color: textColor },
								]}
							>
								Door no.
							</Text>
							<TextInput
								placeholder="Enter door no."
								placeholderTextColor="#aaa"
								style={[
									styles.input,
									{
										backgroundColor: cardsColor,
										color: textColor,
									},
								]}
								value={formData.doorNo}
								onChangeText={(text) =>
									setFormData((prev) => ({
										...prev,
										doorNo: text,
									}))
								}
							/>

							<Text
								style={[
									styles.label,
									{ fontSize: 12, color: textColor },
								]}
							>
								Street name
							</Text>
							<TextInput
								placeholder="Enter your street"
								placeholderTextColor="#aaa"
								style={[
									styles.input,
									{
										backgroundColor: cardsColor,
										color: textColor,
									},
								]}
								value={formData.street}
								onChangeText={(text) =>
									setFormData((prev) => ({
										...prev,
										street: text,
									}))
								}
							/>

							<RoundedButton
								title={onlyForm ? "Submit" : "Update"}
								onPress={handleFormSubmit}
							/>
						</View>
					) : (
						<View
							style={[
								styles.form,
								{
									paddingTop: 0,
									paddingBottom: 30,
									backgroundColor: secondaryColor,
								},
							]}
						>
							{/* USER ID */}
							<View style={styles.userIdContainer}>
								<Text
									style={[
										styles.label,
										{ fontSize: 18, color: textColor },
									]}
								>
									This is Your User ID
								</Text>
								<View
									style={[
										styles.userIdBox,
										{
											borderColor: primaryColor,
											backgroundColor: cardsColor,
										},
									]}
								>
									<Feather
										name="user-check"
										size={18}
										color={primaryColor}
										style={styles.userIdIcon}
									/>
									<Text
										style={[
											styles.userIdText,
											{ color: textColor },
										]}
									>
										{formData.UID}
									</Text>
								</View>
							</View>

							{/* USER INFO */}
							<View style={styles.addressContainer}>
								{/* Name */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<Feather
											name="user"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.name}
									</Text>
								</View>

								{/* Gender */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<FontAwesome
											name={
												formData.gender === "Female"
													? "venus"
													: formData.gender === "Male"
														? "mars"
														: "genderless"
											}
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.gender || "Not specified"}
									</Text>
								</View>

								{/* Address */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<Feather
											name="map-pin"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.street
											? `${formData.street}, ${formData.doorNo}`
											: "Address not available"}
									</Text>
								</View>

								{/* City */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<Feather
											name="home"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.city || "City not available"}
									</Text>
								</View>

								{/* State */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<Feather
											name="globe"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.state ||
											"State not available"}
									</Text>
								</View>

								{/* Phone */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<Feather
											name="phone"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.phoneNo ||
											"Phone not available"}
									</Text>
								</View>

								{/* Email */}
								<View style={styles.infoRow}>
									<View
										style={[
											styles.iconContainer,
											{
												backgroundColor:
													primaryColor + "20",
											},
										]}
									>
										<MaterialIcons
											name="email"
											size={16}
											color={primaryColor}
										/>
									</View>
									<Text
										style={[
											styles.addressText,
											{ color: textColor },
										]}
									>
										{formData.email ||
											"Email not available"}
									</Text>
								</View>
							</View>
						</View>
					)}

					{!edit && !onlyForm && (
						<TouchableOpacity
							style={[
								styles.helpButton,
								{ backgroundColor: cardsColor },
							]}
							onPress={() =>
								router.push("/(protected)/settings/help")
							}
						>
							<Entypo
								name="help-with-circle"
								size={35}
								color={primaryColor}
							/>
						</TouchableOpacity>
					)}
				</ScrollView>
			</KeyboardAvoidingView>
			{/* Camera Modal */}
			<Modal
				visible={showCamera}
				animationType="fade"
				presentationStyle="fullScreen"
			>
				<CameraScreen
					setShowCamera={setShowCamera}
					setImage={setAvatar}
				/>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerBg: {
		width: "100%",
		height: 150,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 0,
	},
	editButton: {
		position: "absolute",
		top: 10,
		right: 16,
		zIndex: 10,
	},
	profilePicWrapper: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: -40,
		zIndex: 100,
	},
	profilePic: {
		width: 90,
		height: 90,
		borderRadius: 45,
		borderWidth: 3,
		overflow: "hidden",
	},
	profileImage: {
		width: "100%",
		height: "100%",
	},
	addIcon: {
		position: "absolute",
		right: -2,
		bottom: 0,
		backgroundColor: "#fff",
		borderRadius: 12,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
	},
	form: {
		paddingHorizontal: 20,
		paddingTop: 50,
		flex: 1,
	},
	label: {
		fontSize: 14,
		marginBottom: 8,
		marginTop: 12,
		fontWeight: "500",
	},
	input: {
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		marginBottom: 12,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	inputContainer: {
		marginBottom: 12,
	},
	button: {
		borderRadius: 999,
		paddingVertical: 14,
		alignItems: "center",
		marginVertical: 20,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
	},

	helpButton: {
		position: "absolute",
		right: 20,
		bottom: 40,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},

	genderToggleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
		gap: 8,
	},
	genderOption: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 6,
		borderWidth: 1,
	},
	userIdContainer: {
		alignItems: "center",
		marginVertical: 25,
		marginBottom: 30,
	},
	userIdBox: {
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	userIdText: {
		fontSize: 16,
		fontWeight: "600",
	},
	userIdIcon: {
		marginRight: 8,
	},
	addressContainer: {
		marginHorizontal: 20,
		gap: 15,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	addressText: {
		fontSize: 15,
		flex: 1,
		flexWrap: "wrap",
	},
});

export default UserForm;
