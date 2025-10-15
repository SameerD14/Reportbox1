// hooks/useAppTheme.ts
import { useThemeColor } from "@/hooks/useThemeColor";

export const useAppTheme = () => {
	const textColor = useThemeColor({}, "text");
	const primaryColor = useThemeColor({}, "primary");
	const secondaryColor = useThemeColor({}, "secondary");
	const cardsColor = useThemeColor({}, "cardsColor");
	const bgLoader = useThemeColor({}, "bgLoader");
	const transparentBackground = useThemeColor({}, "transparentBackground");
	return {
		primaryColor,
		secondaryColor,
		textColor,
		cardsColor,
		bgLoader,
		transparentBackground,
	};
};
