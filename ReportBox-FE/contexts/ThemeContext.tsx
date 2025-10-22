// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { Appearance } from "react-native";

// export type ThemeMode = "light" | "dark" | "system";

// const ThemeContext = createContext({
// 	theme: "light" as "light" | "dark",
// 	mode: "system" as ThemeMode,
// 	setThemeMode: (_: ThemeMode) => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [mode, setMode] = useState<ThemeMode>("system");
// 	const [theme, setTheme] = useState<"light" | "dark">("light");

// 	useEffect(() => {
// 		(async () => {
// 			const storedMode = await AsyncStorage.getItem("theme-mode");
// 			if (
// 				storedMode === "light" ||
// 				storedMode === "dark" ||
// 				storedMode === "system"
// 			) {
// 				setMode(storedMode);
// 				const systemTheme = Appearance.getColorScheme() || "light";
// 				setTheme(storedMode === "system" ? systemTheme : storedMode);
// 			} else {
// 				setMode("system");
// 				setTheme(Appearance.getColorScheme() || "light");
// 			}
// 		})();
// 	}, []);

// 	useEffect(() => {
// 		if (mode !== "system") return;
// 		const listener = ({
// 			colorScheme,
// 		}: Appearance.AppearancePreferences) => {
// 			setTheme(colorScheme || "light");
// 		};
// 		const sub = Appearance.addChangeListener(listener);
// 		return () => sub.remove();
// 	}, [mode]);

// 	const setThemeMode = async (newMode: ThemeMode) => {
// 		setMode(newMode);
// 		await AsyncStorage.setItem("theme-mode", newMode);
// 		const systemTheme = Appearance.getColorScheme() || "light";
// 		setTheme(newMode === "system" ? systemTheme : newMode);
// 	};

// 	return (
// 		<ThemeContext.Provider value={{ theme, mode, setThemeMode }}>
// 			{children}
// 		</ThemeContext.Provider>
// 	);
// };

// export const useThemeContext = () => useContext(ThemeContext);
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
	theme: "light" | "dark";
	mode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	mode: "system",
	setThemeMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>("system");
	const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
		Appearance.getColorScheme() ?? "light"
	);

	// load stored preference
	useEffect(() => {
		(async () => {
			const storedMode = await AsyncStorage.getItem("theme-mode");
			if (
				storedMode === "light" ||
				storedMode === "dark" ||
				storedMode === "system"
			) {
				setMode(storedMode);
			}
		})();
	}, []);

	// listen for system changes ALWAYS
	useEffect(() => {
		const listener = ({
			colorScheme,
		}: Appearance.AppearancePreferences) => {
			setSystemTheme(colorScheme ?? "light");
		};
		const sub = Appearance.addChangeListener(listener);
		return () => sub.remove();
	}, []);

	// compute actual theme
	const theme: "light" | "dark" = mode === "system" ? systemTheme : mode;

	const setThemeMode = async (newMode: ThemeMode) => {
		setMode(newMode);
		await AsyncStorage.setItem("theme-mode", newMode);
	};

	return (
		<ThemeContext.Provider value={{ theme, mode, setThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
