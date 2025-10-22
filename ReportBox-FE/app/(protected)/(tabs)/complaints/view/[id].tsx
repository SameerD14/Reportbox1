import { PostCard } from "@/components/complaints/PostCard";
import Blob from "@/components/on-bording/blob";
import Loader from "@/components/ui/Loader";
import { formateDate } from "@/constants/statuscode";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getComplaintsByID } from "@/services/complaint.service";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PostDetailsScreen = () => {
	const [complaint, setComplaint] = useState<any>(null); // default null
	const { id } = useLocalSearchParams();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	const [loading, setLoading] = useState(false);

	const buildTimeline = (post: {
		raisedDate?: string;
		responseDate?: string;
		resolvedDate?: string;
	}) => {
		const timeline = [];
		timeline.push({ date: post.raisedDate || "-", icon: "handshake" });
		timeline.push({
			date: post.responseDate || "-",
			icon: "checkmark-done",
		});
		timeline.push({ date: post.resolvedDate || "-", icon: "award" });
		return timeline;
	};

	const fetchComplaints = async () => {
		try {
			setLoading(true);
			const data = await getComplaintsByID(id as string);
			setComplaint(data);
		} catch (err) {
			console.error("Error fetching complaints:", err);
		} finally {
			setLoading(false);
		}
	};

	const isFocused = useIsFocused();
	useEffect(() => {
		fetchComplaints();
	}, [id, isFocused]);
	const { setGlobalLoading } = useLoading();
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	if (loading) {
		return <Loader />;
	}

	if (!complaint) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: secondaryColor,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Blob text={"No Complaint !"} iconName={"newspaper-sharp"} />
			</View>
		);
	}

	return (
		<ScrollView
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
			}}
			contentContainerStyle={{ paddingBottom: 100 }}
			showsVerticalScrollIndicator={false}
		>
			{/* Timeline and PostCard */}
			<View
				style={{
					backgroundColor: cardsColor,
					borderRadius: 10,
					paddingVertical: 15,
				}}
			>
				<PostCard
					item={complaint}
					showviewMore={false}
					onLike={async () => await fetchComplaints()}
					onComment={async () => await fetchComplaints()}
				/>

				{buildTimeline(complaint).map((step, index, arr) => (
					<View key={index} style={styles.timelineItem}>
						<View style={styles.iconContainerWrapper}>
							{index > 0 && (
								<View style={styles.verticalLineTop} />
							)}
							{index < arr.length - 1 && (
								<View style={styles.verticalLineBottom} />
							)}
							<View
								style={[
									styles.circle,
									{ backgroundColor: secondaryColor },
								]}
							>
								{step.icon === "handshake" && (
									<FontAwesome5
										name="handshake"
										size={18}
										color={primaryColor}
									/>
								)}
								{step.icon === "checkmark-done" && (
									<Ionicons
										name="checkmark-done"
										size={22}
										color={primaryColor}
									/>
								)}
								{step.icon === "award" && (
									<FontAwesome5
										name="award"
										size={18}
										color={primaryColor}
									/>
								)}
							</View>
						</View>
						<Text
							style={{
								color: textColor,
								fontSize: 16,
								fontWeight: "400",
							}}
						>
							{formateDate(step.date)}
						</Text>
					</View>
				))}
			</View>

			{complaint?.feedback && (
				<View
					style={{
						marginTop: 24,
						backgroundColor: "#e0f7fa",
						padding: 20,
						borderRadius: 12,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: "#004d40",
							textAlign: "center",
						}}
					>
						{complaint.feedback}
					</Text>
				</View>
			)}
		</ScrollView>
	);
};
export default PostDetailsScreen;
const styles = StyleSheet.create({
	timelineItem: {
		flexDirection: "row",
		alignItems: "center",

		paddingHorizontal: 15,
		marginBottom: 16,
		position: "relative",
		marginLeft: 20,
	},
	iconContainerWrapper: {
		width: 40,
		height: 40,
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,

		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	verticalLineTop: {
		position: "absolute",
		width: 2,
		backgroundColor: "#555",
		top: -16,
		height: 16,
		left: "50%",
		marginLeft: -1,
		zIndex: 1,
	},
	verticalLineBottom: {
		position: "absolute",
		width: 2,
		backgroundColor: "#555",
		bottom: -16,
		height: 16,
		left: "50%",
		marginLeft: -1,
		zIndex: 1,
	},
});
