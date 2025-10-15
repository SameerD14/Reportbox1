/* -------------------------------------------------------------------------- */
/*               UPDATE LISTENER CALLED WHEN ANY UPDATE TRIGGER               */
/* -------------------------------------------------------------------------- */

import * as Updates from "expo-updates";
import { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";

const isDev = __DEV__; // Development mode flag

const UpdatesListener = () => {
	const hasShownToast = useRef(false);

	// Extract update status
	const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

	/**
	 * Apply update by fetching and reloading app.
	 */
	const applyUpdate = async () => {
		try {
			const result = await Updates.fetchUpdateAsync();
			if (result.isNew) {
				await Updates.reloadAsync();
			}
		} catch (error) {
			console.error("Failed to apply update:", error);
			Toast.show({
				type: "error",
				text1: "Update error",
				text2: "Please restart the app manually",
			});
		}
	};

	useEffect(() => {
		const checkForUpdate = async () => {
			if (
				(isUpdateAvailable || isUpdatePending) &&
				!hasShownToast.current
			) {
				hasShownToast.current = true;

				Toast.show({
					type: "info",
					text1: "New update available",
					text2: "Tap to reload",
					autoHide: false, // keep visible until user taps
					onPress: async () => {
						try {
							await Updates.reloadAsync();
						} catch (err) {
							console.error("Failed to reload app:", err);
						}
					},
				});
			}
		};

		if (!isDev) {
			checkForUpdate();
		}
	}, [isUpdateAvailable, isUpdatePending]);

	return null;
};

export default UpdatesListener;
