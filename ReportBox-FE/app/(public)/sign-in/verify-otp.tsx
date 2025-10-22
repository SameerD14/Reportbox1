import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { verifySentOtp } from "@/services/auth.service";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
function VerificationScreen() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const { data, completeProfile, setTempData } = useAuth();
	const { primaryColor, textColor, cardsColor } = useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [isValidOtp, setIsValidOtp] = useState(false);
	const [showVerificationIcon, setShowVerificationIcon] = useState(false);

	const handleKeyPress = async (digit: string) => {
		if (digit === "x") {
			setCode(code.slice(0, -1));
		} else if (code.length < 4) {
			const newCode = code + digit;
			setCode(newCode);

			// Automatically verify when code reaches 4 digits
			if (newCode.length === 4) {
				const { status, isRegistered, userID } = await verifySentOtp({
					email: data?.email,
					otp: newCode,
				});
				setIsValidOtp(status);
				setShowVerificationIcon(true);

				if (status) {
					setTempData("userID", userID);
					Toast.show({
						type: "success",
						text1: "Email Verifed.",
					});

					if (isRegistered) {
						setTimeout(() => {
							completeProfile(userID);
						}, 1000);
					} else {
						setTimeout(() => {
							router.replace("/(public)/sign-in/verified");
						}, 500);
					}
				} else {
					Toast.show({
						type: "error",
						text1: "Incorrect OTP.",
					});
				}
			}
		}
	};

	const renderDigits = () => {
		return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "x"].map(
			(digit, idx) => (
				<TouchableOpacity
					key={idx}
					onPress={() => handleKeyPress(digit)}
					className="w-16 h-16 m-2  items-center justify-center bg-transparent"
				>
					{digit === "x" ? (
						<FontAwesome5
							name="backspace"
							size={24}
							color={textColor}
						/>
					) : (
						<Text
							className="text-2xl font-semibold "
							style={{ color: textColor }}
						>
							{digit}
						</Text>
					)}
				</TouchableOpacity>
			)
		);
	};
	/* -------------------------------------------------------------------------- */
	return (
		<View className="px-6 items-center">
			<Text
				className=" text-xl font-bold mb-2"
				style={{ color: textColor }}
			>
				VERIFICATION CODE
			</Text>

			<Text
				className="text-gray-300  mb-6 text-center text-lg"
				style={{ color: textColor }}
			>
				Please enter verification code sent to {data?.email}
			</Text>

			<View className="flex-row items-center justify-between w-full px-6 mb-2">
				<View className="flex-row space-x-4 mx-auto">
					{[...Array(4).keys()].map((_, i) => (
						<View
							key={i}
							className="w-14 m-1 h-14 rounded-md  items-center justify-center"
							style={{ backgroundColor: cardsColor }}
						>
							<Text
								className="text-2xl font-bold"
								style={{ color: textColor }}
							>
								{code?.[i] ?? ""}
							</Text>
						</View>
					))}
				</View>

				<View className="absolute -right-1">
					{showVerificationIcon && (
						<Feather
							name={isValidOtp ? "check-circle" : "x-circle"}
							size={28}
							color={isValidOtp ? primaryColor : "#e31837"}
						/>
					)}
				</View>
			</View>
			{/* Numpad */}
			<View className="flex-row flex-wrap justify-center">
				{renderDigits()}
			</View>
		</View>
	);
}

const VerifyOTP = () => {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.unsplash.com/photo-1591453214154-c95db71dbd83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhbmRzaGFrZXxlbnwwfHwwfHx8MA%3D%3D"
			imageContainerHeight={0.4}
			svgStyle={{ opacity: 1 }}
		>
			<VerificationScreen />
		</WaveHeaderScreen>
	);
};

export default VerifyOTP;
