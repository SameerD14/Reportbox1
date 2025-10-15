import { registerForPushNotificationsAsync } from "@/components/NotificationWrapper";
import CustomAlert from "@/components/ui/CustomAlert";
import { getFullDetails } from "@/services/auth.service";
import { sendOrUpdateToken } from "@/services/push-notification.service";
import { getMMKV, removeMMKV, setMMKV } from "@/storage/mmkv";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

type AuthContextType = {
	user: any;
	session: boolean;
	isLoading: boolean;
	data: any;
	setTempData: (key: string, value: any) => void;
	completeProfile: (id: any) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<any | null>(null);
	const [user, setUser] = useState<any | null>(null);
	const [session, setSession] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Load user from MMKV on app start
	useEffect(() => {
		const load = async () => {
			try {
				const storedUser = getMMKV("user");
				if (storedUser) {
					setUser(storedUser);
					setSession(true);
				}
			} catch (error) {
				console.log("MMKV load error:", error);
			} finally {
				setIsLoading(false);
				await SplashScreen.hideAsync();
			}
		};
		load();
	}, []);

	// Update temporary data (e.g. userID before completeProfile)
	const setTempData = (key: string, value: any) => {
		setData((prev: any) => ({
			...prev,
			[key]: value,
		}));
	};

	// Get full user profile and store it
	const completeProfile = async (id: string) => {
		try {
			const fullDetails = await getFullDetails(id ?? data?.userID);

			setUser(fullDetails);
			setSession(true);
			setMMKV("user", fullDetails);
			const token = await registerForPushNotificationsAsync();

			await sendOrUpdateToken(id ?? data?.userID, token);
		} catch (err) {
			console.log("complete Profile error:", err);
		}
	};

	// Clear all data
	const logout = async () => {
		CustomAlert({
			title: "Logout",
			description: "Are you sure you want to logout?",
			confirmText: "Logout",
			cancelText: "Cancel",
			onConfirm: async () => {
				try {
					setUser(null);
					setSession(false);
					removeMMKV("user");
					router.push("/");
					Toast.show({
						type: "success",
						text1: "Logged out successfully",
					});
				} catch (error) {
					Toast.show({
						type: "error",
						text1: "Unable to logout",
					});
				}
			},
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				isLoading,
				data,
				setTempData,
				completeProfile,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
