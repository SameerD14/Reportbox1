import { useLoading } from "@/contexts/LoadingContext";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const PrivacyPolicy = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	return (
		<View>
			<Text>PrivacyPolicy</Text>
		</View>
	);
};

export default PrivacyPolicy;
