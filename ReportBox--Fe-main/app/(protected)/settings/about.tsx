import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUsScreen = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, textColor, secondaryColor } = useAppTheme();
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */
	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<ScrollView
				contentContainerStyle={styles.scroll}
				showsVerticalScrollIndicator={false}
			>
				{/* Logo or Banner */}
				<Image
					source={{
						uri: "https://images.unsplash.com/vector-1749463475260-5b9353c32ff7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGdvdmVybm1lbnQlMjBsb2dvfGVufDB8fDB8fHww",
					}}
					style={styles.logo}
					resizeMode="contain"
				/>

				{/* Title */}
				<Text style={[styles.heading, { color: primaryColor }]}>
					About Municipal Corporation
				</Text>

				{/* Intro */}
				<Text style={[styles.text, { color: textColor }]}>
					Our Municipal Corporation is committed to creating a clean,
					safe, and sustainable urban environment for all citizens.
					Through dedicated services and timely grievance redressal,
					we strive to improve the quality of life in our city.
				</Text>

				{/* Mission */}
				<Text style={[styles.subheading, { color: primaryColor }]}>
					Our Mission
				</Text>
				<Text style={[styles.text, { color: textColor }]}>
					To provide efficient civic amenities, ensure cleanliness,
					water supply, street lighting, waste management, and
					maintain public infrastructure with transparency and
					accountability.
				</Text>

				{/* Services */}
				<Text style={[styles.subheading, { color: primaryColor }]}>
					Key Services
				</Text>
				<View style={styles.bulletList}>
					{[
						"Water supply and sanitation",
						"Garbage and solid waste management",
						"Street lighting maintenance",
						"Road repairs and drainage",
						"Control of stray animals",
						"Public health and cleanliness",
					].map((item, index) => (
						<Text
							key={index}
							style={[styles.bulletItem, { color: textColor }]}
						>
							• {item}
						</Text>
					))}
				</View>

				{/* Contact Info */}
				<Text style={[styles.subheading, { color: primaryColor }]}>
					Contact Us
				</Text>
				<Text style={[styles.text, { color: textColor }]}>
					📍 Municipal Office, City Center, YourCity - 400001
					{"\n"}📞 Helpline: 1800-123-456
					{"\n"}✉️ Email: support@yourmunicipal.gov.in
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AboutUsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 80,
	},
	scroll: {
		padding: 16,
		paddingBottom: 40,
	},
	logo: {
		width: "100%",
		height: 120,
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 12,
	},
	subheading: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 8,
	},
	text: {
		fontSize: 15,
		lineHeight: 22,
		marginBottom: 10,
	},
	bulletList: {
		marginLeft: 10,
	},
	bulletItem: {
		fontSize: 15,
		lineHeight: 22,
	},
});
