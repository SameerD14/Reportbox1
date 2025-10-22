import { formatCreatedAtTime, getStatusStyle } from "@/constants/statuscode";
import { useAuth } from "@/contexts/AuthContext";
import { useImagePreview } from "@/contexts/ImagePreviewContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	addComment,
	deleteComplaintByID,
	likeComplaint,
} from "@/services/complaint.service";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import CustomAlert from "../ui/CustomAlert";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function PostCard({
	item,
	showviewMore = true,
	onLike,
	onComment,
}: any) {
	const router = useRouter();
	const { primaryColor, cardsColor, textColor, secondaryColor } =
		useAppTheme();
	const { user } = useAuth();
	const { showImage } = useImagePreview();

	/* -------------------------------------------------------------------------- */
	const [menuVisible, setMenuVisible] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const [newCommentText, setNewCommentText] = useState("");

	/* -------------------------------------------------------------------------- */
	const toggleComments = () => {
		setShowComments(!showComments);
		Animated.timing(animatedHeight, {
			toValue: showComments ? 0 : 1,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const handleLike = async () => {
		await likeComplaint(item._id, user?.user?._id);
		if (onLike) onLike(item._id);
	};

	const handleAddComment = async () => {
		if (!newCommentText.trim()) return;
		await addComment(item._id, user?.user?._id, newCommentText.trim());
		setNewCommentText("");
		if (onComment) onComment(item._id);
	};
	/* -------------------------------------------------------------------------- */
	const commentsMaxHeight = animatedHeight.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 300],
	});

	/* -------------------------------------------------------------------------- */

	return (
		<Pressable
			style={[styles.card, { backgroundColor: cardsColor }]}
			onPress={() => {
				if (!showviewMore) return;
				router.push({
					pathname: "/(protected)/(tabs)/complaints/view/[id]",
					params: { id: item._id },
				});
			}}
		>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Pressable onPress={() => showImage(item?.userID?.avatar)}>
						<Image
							source={{
								uri: item?.userID?.avatar,
							}}
							resizeMode="cover"
							style={styles.avatar}
						/>
					</Pressable>
					<View>
						<Text style={{ color: textColor, fontWeight: "600" }}>
							{item?.userID?.name}
						</Text>
						<Text
							style={{
								color: "#aaa",
								fontSize: 12,
							}}
						>
							{formatCreatedAtTime(item?.createdAt)}
						</Text>
					</View>
				</View>
				{showviewMore ||
					(item?.userID?._id === user?.user?._id && (
						<Feather
							name="more-vertical"
							size={25}
							color={textColor}
							onPress={() => setMenuVisible(!menuVisible)}
						/>
					))}
				{menuVisible && (
					<View
						style={{
							position: "absolute",
							right: 0,
							top: 40,
							backgroundColor: secondaryColor,
							borderRadius: 8,
							paddingVertical: 4,
							paddingHorizontal: 8,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
							elevation: 5,
							borderWidth: 0.5,
							borderColor: "#ccc",
							width: 120,
							zIndex: 100,
						}}
					>
						<Pressable
							onPress={() => {
								setMenuVisible(false);
								router.push({
									pathname:
										"/(protected)/(tabs)/complaints/edit/[id]",
									params: { id: item._id },
								});
							}}
							style={{ paddingVertical: 8 }}
						>
							<Text
								style={{
									color: textColor,
									fontSize: 14,
									fontWeight: "500",
								}}
							>
								Edit
							</Text>
						</Pressable>

						<Pressable
							onPress={() => {
								setMenuVisible(false);
								CustomAlert({
									title: "Are to sure to delete complaint?",
									onConfirm: async () => {
										await deleteComplaintByID(item._id);
										Toast.show({
											type: "success",
											text1: "Complaint Deleted.",
										});
										router.replace(
											"/(protected)/(tabs)/dashboard"
										);
									},
									confirmText: "Delete",
									cancelText: "cancel",
								});
							}}
							style={{ paddingVertical: 8 }}
						>
							<Text
								style={{
									color: textColor,
									fontSize: 14,
									fontWeight: "500",
								}}
							>
								Delete
							</Text>
						</Pressable>
					</View>
				)}
			</View>
			{/* Images */}
			<View style={styles.imageRow}>
				{item?.beforeImage && (
					<TouchableOpacity
						style={styles.imageHalfTouchable}
						onPress={() => showImage(item?.beforeImage)}
						activeOpacity={0.7}
					>
						<Image
							source={{ uri: item?.beforeImage }}
							style={styles.imageHalf}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				)}
				{item?.afterImage && (
					<TouchableOpacity
						style={styles.imageHalfTouchable}
						onPress={() => showImage(item?.afterImage)}
						activeOpacity={0.7}
					>
						<Image
							source={{ uri: item?.afterImage }}
							style={styles.imageHalf}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* Message */}
			<Text style={[styles.message, { color: textColor }]}>
				{item?.message}
			</Text>
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{item?.tags?.map((tag: string, index: number) => (
					<Text key={index} style={styles.tag}>
						{tag.startsWith("#") ? tag : `#${tag}`}{" "}
					</Text>
				))}
			</View>
			<Text style={[styles.status, getStatusStyle(item.status)]}>
				{item.status}
			</Text>
			<View style={styles.actions}>
				<View style={styles.actionIcons}>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={handleLike}
					>
						<Ionicons
							name={
								item.likes?.some(
									(like: any) =>
										like.userID?._id === user?.user?._id
								)
									? "thumbs-up"
									: "thumbs-up-outline"
							}
							size={20}
							color={primaryColor}
						/>
						<Text style={{ color: textColor, fontSize: 14 }}>
							{item.likes?.length || 0}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={toggleComments}
					>
						<Ionicons
							name="chatbubble-outline"
							size={20}
							color={textColor}
						/>
						<Text style={{ color: textColor, fontSize: 14 }}>
							{item.comments?.length || 0}
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity>
						<Ionicons
							name="share-social-outline"
							size={20}
							color={textColor}
						/>
					</TouchableOpacity> */}
				</View>
			</View>

			{/* Comments Section */}
			<Animated.View
				style={[
					styles.commentsSection,
					{ maxHeight: commentsMaxHeight, overflow: "hidden" },
				]}
			>
				{showComments && (
					<>
						{item.comments.map((comment: any) => (
							<View
								style={styles.commentContainer}
								key={comment._id}
							>
								<Image
									source={{
										uri: comment?.userID?.avatar,
									}}
									style={styles.commentAvatar}
								/>
								<View style={styles.commentContent}>
									<Text
										style={[
											styles.commentUser,
											{ color: textColor },
										]}
									>
										{comment?.userID?.name}
									</Text>
									<Text
										style={{
											color: textColor,
											fontSize: 13,
										}}
									>
										{comment?.message}
									</Text>
								</View>
							</View>
						))}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginTop: 6,
							}}
						>
							<TextInput
								value={newCommentText}
								onChangeText={setNewCommentText}
								placeholder="Add a comment..."
								style={{
									flex: 1,
									borderWidth: 1,
									borderColor: primaryColor,
									borderRadius: 20,
									paddingHorizontal: 10,
									color: textColor,
								}}
							/>
							<TouchableOpacity
								onPress={handleAddComment}
								style={{ marginLeft: 8 }}
							>
								<FontAwesome
									name="send"
									size={18}
									color={primaryColor}
								/>
							</TouchableOpacity>
						</View>
					</>
				)}
			</Animated.View>

			{/* Image Viewer */}
		</Pressable>
	);
}

export default PostCard;
const styles = StyleSheet.create({
	card: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		position: "relative",
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",

		gap: 4,
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},

	imageRow: {
		flexDirection: "row",
		height: 160,
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 12,
	},
	imageHalf: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	imageHalfTouchable: {
		flex: 1, // Ensure touchable area fills its half
	},
	message: {
		fontSize: 14,
		marginBottom: 4,
	},
	tag: {
		color: "#00bcd4",
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 2,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	actionIcons: {
		flexDirection: "row",
		gap: 20,
	},
	viewMore: {
		color: "#00bcd4",
		fontSize: 14,
	},
	commentsSection: {
		overflow: "hidden",
		marginTop: 10,

		paddingTop: 10,
	},
	commentContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	commentAvatar: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 10,
	},
	commentContent: {
		flex: 1,
	},
	commentUser: {
		fontWeight: "bold",
		fontSize: 13,
		marginBottom: 2,
	},

	imageViewerContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenImage: {
		width: screenWidth * 0.9,
		height: screenHeight * 0.8,
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 1,
		padding: 10,
	},
	status: {
		alignSelf: "flex-end",
		fontSize: 12,
		fontWeight: "bold",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
		overflow: "hidden",
		marginBottom: 8,
	},
	newCommentContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 8,
	},
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginRight: 8,
		fontSize: 14,
	},
	commentButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
});
