import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// --- Data Definition (as above, or import from a constants file) ---
interface ComplaintStep {
	id: number;
	text: string;
}
/* -------------------------------------------------------------------------- */
const complaintSteps: ComplaintStep[] = [
	{ id: 1, text: 'Tap on the "Add" icon on the home screen.' },
	{ id: 2, text: "Choose the issue category you want to report." },
	{
		id: 3,
		text: "Select whether it's a Single Complaint or a Group Complaint.",
	},
	{
		id: 4,
		text: "(If Group Complaint) Choose the number of members involved.",
	},
	{
		id: 5,
		text: "Type your complaint or tap the mic icon to speak it aloud.",
	},
	{
		id: 6,
		text: 'Tap "Attach File" —\n• Use the camera to snap the issue with location.\n• Or select from gallery to upload a photo.',
	},
	{ id: 7, text: "Review all entered details carefully." },
	{
		id: 8,
		text: "Type your complaint or tap the mic icon to speak it aloud.",
	},
	{
		id: 9,
		text: "Select whether it's a Single Complaint or a Group Complaint.",
	},
	{ id: 10, text: "Review all entered details carefully." },
];
/* -------------------------------------------------------------------------- */
const CIRCLE_SIZE = 48;
const LINE_WIDTH = 2;
const ITEM_MARGIN_BOTTOM = 20;
/* -------------------------------------------------------------------------- */
const ComplaintStepsTimeline = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */

	//images.unsplash.com/photo-1721305254301-bc22475ccf14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFuZHMlMjB0b2dldGhlciUyMGZvciUyMHBsYW50fGVufDB8MHwwfHx8MA%3D%3D
	https: return (
		<ScrollView
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
			}}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 100,
			}}
		>
			<View style={{ flex: 1, paddingBottom: 20 }}>
				<Text style={[styles.title, { color: textColor }]}>
					Steps to Raise a Complaint:
				</Text>
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1721305254301-bc22475ccf14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFuZHMlMjB0b2dldGhlciUyMGZvciUyMHBsYW50fGVufDB8MHwwfHx8MA%3D%3D",
					}}
					style={{ height: 200, width: "100%", borderRadius: 15 }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.container}>
				<Text style={[styles.title, { color: textColor }]}>
					How to Raise Complaint?
				</Text>

				{/* Initial top circle (turquoise dot) */}
				<View style={styles.firstStepContainer}>
					<View
						style={[
							styles.firstStepDot,
							{ backgroundColor: primaryColor },
						]}
					/>
					{/* Vertical line from dot to first numbered step */}
					<View
						style={[
							styles.verticalLine,
							{
								height: ITEM_MARGIN_BOTTOM + CIRCLE_SIZE / 2, // Half circle height + item margin
								top: CIRCLE_SIZE / 2, // Start below the dot's center
								left: CIRCLE_SIZE / 2 - LINE_WIDTH / 2, // Center under the dot
							},
						]}
					/>
				</View>

				{/* Map through the complaint steps */}
				{complaintSteps.map((step, index) => (
					<View key={step.id} style={styles.stepItem}>
						{/* Circle and Number Container */}
						<View style={styles.circleWrapper}>
							<View
								style={[
									styles.circle,
									{ backgroundColor: cardsColor },
								]}
							>
								<Text
									style={[
										styles.circleText,
										{ color: textColor },
									]}
								>
									{step.id < 10 ? `0${step.id}` : step.id}
								</Text>
							</View>

							{/* Vertical line connecting to the next circle */}
							{index < complaintSteps.length - 1 && (
								<View
									style={[
										styles.verticalLine,
										{
											height:
												ITEM_MARGIN_BOTTOM +
												CIRCLE_SIZE, // Height of the line is item margin + full circle height
											top: CIRCLE_SIZE - LINE_WIDTH / 2, // Position at bottom of current circle
											left:
												CIRCLE_SIZE / 2 -
												LINE_WIDTH / 2, // Center it
										},
									]}
								/>
							)}
						</View>

						{/* Step Description Text */}
						<Text style={[styles.stepText, { color: textColor }]}>
							{step.text}
						</Text>
					</View>
				))}
				<View style={styles.firstStepContainer}>
					{/* Vertical line from dot to first numbered step */}
					<View
						style={[
							styles.verticalLine,
							{
								height: ITEM_MARGIN_BOTTOM + CIRCLE_SIZE / 2, // Half circle height + item margin
								bottom: CIRCLE_SIZE / 2, // Start below the dot's center
								left: CIRCLE_SIZE / 2 - LINE_WIDTH / 2, // Center under the dot
							},
						]}
					/>
					<View
						style={[
							styles.firstStepDot,
							{ backgroundColor: primaryColor },
						]}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	firstStepContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: ITEM_MARGIN_BOTTOM,
		paddingLeft: 0,
		position: "relative",
		height: CIRCLE_SIZE,
	},
	firstStepDot: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		marginRight: 15,
		zIndex: 2,
	},
	stepItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: ITEM_MARGIN_BOTTOM,
		position: "relative",
	},
	circleWrapper: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#555",
		zIndex: 2,
	},
	circleText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	verticalLine: {
		position: "absolute",
		width: LINE_WIDTH,
		backgroundColor: "#555",
		left: CIRCLE_SIZE / 2 - LINE_WIDTH / 2,
		zIndex: 1,
	},
	stepText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 24,
	},
});

export default ComplaintStepsTimeline;
