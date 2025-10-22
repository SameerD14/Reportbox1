import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintSuccessModal from "@/components/complaints/ComplaintSuccessModal";
import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import LeafletMapWebView from "@/components/native/Map";
import RoundedButton from "@/components/ui/RoundedButton";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	getComplaintsByID,
	updateComplaint,
} from "@/services/complaint.service";
import { useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
const validateFormData = (complaintData: any) => {
	const { beforeImage, type, message, location, tags } = complaintData;

	if (!beforeImage.trim()) {
		Toast.show({ type: "error", text1: "Plase upload a Image" });
		return false;
	}
	if (!type.trim()) {
		Toast.show({ type: "error", text1: "Complaint Type is required." });
		return false;
	}
	if (!message.trim()) {
		Toast.show({ type: "error", text1: "Explain your complaint." });
		return false;
	}
	if (!location.trim()) {
		Toast.show({ type: "error", text1: "Location is required." });
		return false;
	}
	if (!Array.isArray(tags) || tags.length === 0) {
		Toast.show({ type: "error", text1: "At least one tag is required." });
		return false;
	}

	return true;
};
const ComplaintEdit = () => {
	const { id } = useLocalSearchParams();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor } = useAppTheme();

	/* -------------------------------------------------------------------------- */
	const [CID, setCID] = useState("");
	const [showCamera, setShowCamera] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [complaintData, setComplaintData] = useState({
		beforeImage: "",
		type: "",
		subtype: "",
		message: "",
		location: "",
		tags: [],
	});

	/* -------------------------------------------------------------------------- */

	const fetchComplaints = async () => {
		try {
			const data = await getComplaintsByID(id as string);

			if (data) {
				setCID(data?.cid);
				// Pre-fill form with existing data
				setComplaintData({
					beforeImage: data.beforeImage || "",
					type: data.type || "",
					subtype: data.subtype || "",
					message: data.message || "",
					location: data.location || "",
					tags: Array.isArray(data.tags) ? data.tags : [],
				});
			}
		} catch (err) {
			console.error("Error fetching complaints:", err);
		} finally {
		}
	};

	// Handle form field updates
	const handleSetImage = (newImage: string) =>
		setComplaintData((prev) => ({ ...prev, beforeImage: newImage }));

	const handleSetLocation = (newLocation: string) => {};
	// setComplaintData((prev) => ({ ...prev, location: newLocation }));

	const handleSetMessage = (newExplan: string) =>
		setComplaintData((prev) => ({ ...prev, message: newExplan }));

	const handleSetTags = (newTags: string) => {
		const tagsArray = newTags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag.length);

		setComplaintData((prev: any) => ({ ...prev, tags: tagsArray }));
	};

	const onSubmit = async () => {
		if (!validateFormData(complaintData)) return;
		try {
			setGlobalLoading(true);
			Keyboard.dismiss();

			await updateComplaint(id as string, complaintData);

			Toast.show({
				type: "success",
				text1: "Complaint updated successfully",
			});
			setTimeout(() => {
				setShowSuccess(true);
			}, 800);
		} catch (err) {
			console.error("Error updating complaint:", err);
			Toast.show({ type: "error", text1: "Failed to update complaint" });
		} finally {
			setGlobalLoading(false);
		}
	};

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		if (id) fetchComplaints();
	}, [id]);
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				marginTop: 110,
				padding: 16,
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<Text style={[styles.title, { color: textColor }]}>
						Edit Complaint:
					</Text>

					<ImageCard
						image={complaintData.beforeImage}
						setShowCamera={setShowCamera}
						setImage={handleSetImage}
					/>

					<ComplaintForm
						subtypes={complaintData.subtype}
						location={complaintData.location}
						setLocation={handleSetLocation}
						message={complaintData.message}
						setMessage={handleSetMessage}
						tags={complaintData.tags.join(", ")}
						setTags={handleSetTags}
						setComplaintType={(type: string) =>
							setComplaintData((prev) => ({ ...prev, type }))
						}
						setComplaintSubtype={(subtype: string) =>
							setComplaintData((prev) => ({ ...prev, subtype }))
						}
					/>

					<RoundedButton title={"Submit"} onPress={onSubmit} />

					<View
						style={{ height: 200, width: "100%", borderRadius: 20 }}
					>
						<LeafletMapWebView
							location={complaintData.location}
							setLocation={handleSetLocation}
						/>
					</View>

					<Modal
						visible={showCamera}
						animationType="fade"
						presentationStyle="fullScreen"
					>
						<CameraScreen
							setShowCamera={setShowCamera}
							setImage={handleSetImage}
						/>
					</Modal>

					<ComplaintSuccessModal
						cID={CID}
						titleText="Complaint Edited!"
						btntext="OK"
						visible={showSuccess}
						onClose={() => setShowSuccess(false)}
						onTrack={() => {
							setShowSuccess(false);
							router.back();
						}}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ComplaintEdit;
const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		// White text
		marginBottom: 20,
	},
});
