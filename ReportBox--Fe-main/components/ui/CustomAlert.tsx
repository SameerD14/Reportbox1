/* -------------------------------------------------------------------------- */
/*                  Custom Alert Using rn-custom-alert-prompt                 */
/* -------------------------------------------------------------------------- */

import { TextStyle } from "react-native";
import { Alert } from "rn-custom-alert-prompt";

/* ---------------------------------- Types --------------------------------- */
type Button = {
	text: string;
	textStyle?: TextStyle;
	onPress?: () => void;
};

type AlertProps = {
	title: string;
	description?: string;
	icon?: "error" | "info" | "success" | "question";
	iconColor?: string;
	confirmText?: string;
	confirmColorText?: string;
	cancelText?: string;
	cancelColorText?: string;
	buttons?: Button[];
	showCancelButton?: Boolean;
	onCancel?: () => void;
	onConfirm?: () => void;
};

/* ------------------------------- CustomAlert ------------------------------ */

const CustomAlert = ({
	title,
	description,
	icon,
	iconColor,
	buttons,
	confirmText = "OK",
	confirmColorText = "#e31837",
	cancelText = "cancel",
	cancelColorText = "#94a3b8",
	onCancel,
	onConfirm,
	showCancelButton = false,
}: AlertProps) => {
	const defaultButtons: Button[] = [
		{
			text: cancelText,
			textStyle: {
				fontSize: 16,
				fontWeight: "600",
				color: cancelColorText,
				textTransform: "uppercase",
			} as TextStyle,
			onPress: onCancel ?? (() => null),
		},
		{
			text: confirmText,
			textStyle: {
				fontSize: 16,
				fontWeight: "bold",
				color: confirmColorText,
				textTransform: "uppercase",
			} as TextStyle,
			onPress: onConfirm ?? (() => null),
		},
	];

	Alert.alert({
		title: title,
		description: description ? description : "",
		icon,
		iconColor,
		confirmText,
		confirmColorText,
		cancelText,
		cancelColorText,
		showCancelButton: !!showCancelButton,
		buttons: buttons && buttons.length > 0 ? buttons : defaultButtons,
	});
};

export default CustomAlert;
