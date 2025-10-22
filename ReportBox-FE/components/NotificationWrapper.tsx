/* -------------------------------------------------------------------------- */
/*                            NOTIFICATION WRAPPER                            */
/* -------------------------------------------------------------------------- */
import { getMMKV, MMKV_KEYS, setMMKV } from "@/storage/mmkv";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { Platform } from "react-native";
/* -------------------------------- constants ------------------------------- */
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

/* ----------------------------- State variables ---------------------------- */
let expoPushToken: string | null = null;
let currentNotification: Notifications.Notification | null = null;
let notificationError: Error | null | any = null;
null;

/* --------------------- Initialize notification handler -------------------- */
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
		priority: Notifications.AndroidNotificationPriority.HIGH,
	}),
});

/* -------------------------- Background task setup ------------------------- */
TaskManager.defineTask<Notifications.NotificationResponse>(
	BACKGROUND_NOTIFICATION_TASK,
	async ({ data, error, executionInfo }: any) => {
		try {
			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	}
);

/* ------------------ Notification categories configuration ----------------- */
const categories: {
	id: string;
	actions: Notifications.NotificationAction[];
	options?: Notifications.NotificationCategoryOptions;
}[] = [
	{
		id: "message_category",
		actions: [
			{
				identifier: "REPLY",
				buttonTitle: "Reply",
				textInput: {
					submitButtonTitle: "Send",
					placeholder: "Type a reply...",
				},
			},
			{ identifier: "MARK_AS_READ", buttonTitle: "Mark as Read" },
		],
	},
	{
		id: "email_actions",
		actions: [
			{
				identifier: "BUSY",
				buttonTitle: "Tell them I'm busy right now 😴",
			},
			{
				buttonTitle: "Write a custom response 📝",
				identifier: "REPLY",
				textInput: {
					submitButtonTitle: "Send it ✉️",
					placeholder: "Hm.. what to write?",
				},
				options: {
					// This allows to retrieve NotificationResponse.userText
					opensAppToForeground: false,
				},
			},
			{
				identifier: "DELETE",
				buttonTitle: "Delete that email 🧞",
				options: {
					isAuthenticationRequired: false,
					isDestructive: true,
					opensAppToForeground: true,
				},
			},
		],
	},
	{
		id: "customActions",
		actions: [
			{
				identifier: "VIEW_ACTION",
				buttonTitle: "View",
				options: { opensAppToForeground: true },
			},
			{
				identifier: "IGNORE_ACTION",
				buttonTitle: "Ignore",
				options: { isDestructive: true },
			},
		],
	},
	{
		id: "image",
		actions: [
			{
				identifier: "VIEW_PROFILE",
				buttonTitle: "View Profile",
				options: { opensAppToForeground: true },
				textInput: {
					submitButtonTitle: "Send",
					placeholder: "Type something...",
				},
			},
			{
				identifier: "IGNORE",
				buttonTitle: "Ignore",
				options: { isDestructive: true },
			},
		],
	},
];

/* ----------------------- setupNotificationCategories ---------------------- */
const setupNotificationCategories = async () => {
	await Promise.all(
		categories.map(async ({ id, actions }) => {
			try {
				await Notifications.setNotificationCategoryAsync(id, actions);
			} catch (error) {
				console.error(`Failed to set category ${id}:`, error);
			}
		})
	);
};

/**
 * Check the permission / device and then give expoPushToken
 * @returns expoPushToken
 */
const registerForPushNotificationsAsync = async () => {
	try {
		if (Device.isDevice) {
			const { status } = await Notifications.getPermissionsAsync();
			if (status !== "granted") {
				const { status: newStatus } =
					await Notifications.requestPermissionsAsync();
				if (newStatus !== "granted") {
					throw new Error("Permission denied");
				}
			}

			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error("Project ID not found");
			}

			try {
				const pushTokenString = (
					await Notifications.getExpoPushTokenAsync({ projectId })
				).data;
				// const token = (await Notifications.getDevicePushTokenAsync()).data;
				expoPushToken = pushTokenString;

				return pushTokenString;
			} catch (e: unknown) {
				notificationError = e;
			}
		} else {
			notificationError =
				"Must use physical device for push notifications";
		}
	} catch (error) {
		notificationError = error;
	}
};

/**
 * Schedule Notification
 * @param content  Notifications.NotificationContentInput
 * @param trigger  Notifications.NotificationTriggerInput
 * @returns
 */
const scheduleNotification = async (
	content: Notifications.NotificationContentInput & {
		to?: string;
	} = {
		to: "",
		title: "",
		body: "",
		data: {},
	},
	trigger: Notifications.NotificationTriggerInput = {
		seconds: 0,
		repeats: false,
		type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
	}
): Promise<string | null> => {
	try {
		return await Notifications.scheduleNotificationAsync({
			content,
			trigger,
		});
	} catch (err) {
		notificationError = "Error scheduling notification:" + err;
		return null;
	}
};

/**
 *  Cancel the Schedule Notification by identifier
 * @param identifier
 */
const cancelScheduledNotification = async (identifier: string) => {
	try {
		await Notifications.cancelScheduledNotificationAsync(identifier);
	} catch (error) {
		notificationError = error;
	}
};

/**
 * Cancel All Schedule Notification
 */
const cancelAllScheduledNotifications = async () => {
	try {
		await Notifications.cancelAllScheduledNotificationsAsync();
	} catch (error) {
		notificationError = error;
	}
};

/**
 * Get All Scheduled Notifications
 * @returns
 */
const getAllScheduledNotifications = async () => {
	try {
		return await Notifications.getAllScheduledNotificationsAsync();
	} catch (error) {
		notificationError = error;
		return null;
	}
};

/**
 * Send Notification by Getting expoPushToken
 * @param notificationContent
 * @returns
 */
const sendNotification = async (notificationContent: {
	to?: any;
	title?: string | null;
	subtitle?: string | null;
	categoryIdentifier?: string | null;
	body?: string | null;
	data?: undefined;
	sound?: "default" | "defaultCritical" | "custom" | null;
}) => {
	try {
		const response = await fetch(
			// "https://api.expo.dev/v2/push/send",
			"https://exp.host/--/api/v2/push/send",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Accept-encoding": "gzip, deflate",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(notificationContent),
			}
		);

		const result = await response.json();
		return result;
	} catch (error) {
		notificationError = error;
		return null;
	}
};

/**
 * Send Notification to Multiple User By Getting the Array Of expoPushToken
 * @param notificationContent
 * @returns
 */
const sendMultipleNotification = async (
	notificationContent: Notifications.NotificationContentInput[]
) => {
	try {
		const response: any = await fetch(
			// "https://api.expo.dev/v2/push/send",
			"https://exp.host/--/api/v2/push/send",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Accept-encoding": "gzip, deflate",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(notificationContent),
			}
		);

		const result = await response.json();
		return result;
	} catch (error) {
		notificationError = error;
		return null;
	}
};
/* --------------------------- STORE NOTIFICATION --------------------------- */

export const storeNotificationOnListener = (notification: any) => {
	const request = notification?.request;
	const remoteMessage = request?.trigger?.remoteMessage;
	const content = request?.content;

	const NOTIFICATION_KEY = MMKV_KEYS?.NOTIFICATION_KEY ?? "notifications";

	// Parse possible stringified fields
	let parsedBody: any = {};
	let parsedDataString: any = {};

	try {
		if (remoteMessage?.data?.body) {
			parsedBody = JSON.parse(remoteMessage.data.body);
		}
	} catch {}

	try {
		if (remoteMessage?.data?.dataString) {
			parsedDataString = JSON.parse(remoteMessage.data.dataString);
		}
	} catch {}

	// Construct notification object
	const newNotification = {
		id: remoteMessage?.messageId || Date.now().toString(),
		title: remoteMessage?.data?.title || content?.title || "No Title",
		subtitle: remoteMessage?.data?.subtitle || content?.subtitle || "",
		body: remoteMessage?.data?.message || content?.body || "No Body",
		categoryId:
			remoteMessage?.data?.categoryId ||
			content?.categoryIdentifier ||
			null,
		imageUrl: remoteMessage?.notification?.imageUrl || null,
		user: parsedDataString?.userId || null,
		data: { ...parsedBody, ...parsedDataString },
		receivedAt: new Date().toISOString(),
	};

	// Save into MMKV
	const existingNotifications = getMMKV(NOTIFICATION_KEY) || [];
	setMMKV(NOTIFICATION_KEY, [...existingNotifications, newNotification]);

	return newNotification;
};
/* ------------------------------- checkStatus ------------------------------ */
const checkStatus = async (ids = ["0197c4ce-28c5-7922-aabe-3b13b0a86a04"]) => {
	const response = await fetch(
		"https://exp.host/--/api/v2/push/getReceipts",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ids: ids, // From initial push response
			}),
		}
	);

	const data = await response.json();
	console.log("Receipt:", JSON.stringify(data, null, 2));
};
/* --------------------------------- Getter --------------------------------- */
const getCurrentPushToken = () => expoPushToken;
const getCurrentNotification = () => currentNotification;
const getError = () => notificationError;

/* -------------------------------- Listener -------------------------------- */
let notificationListener: Notifications.EventSubscription | any = null;
let responseListener: Notifications.EventSubscription | any = null;

const initializeNotifications = async () => {
	try {
		Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.HIGH,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
			showBadge: true,
			enableLights: true,
			enableVibrate: true,
			lockscreenVisibility:
				Notifications.AndroidNotificationVisibility.PUBLIC,
		});
		await setupNotificationCategories();
		// await registerForPushNotificationsAsync();
	} catch (error) {}
};

const cleanupNotificationListeners = () => {
	notificationListener.remove();
	responseListener.remove();
};

const NotificationWrapper = () => {
	if (Platform.OS === "web") return null;
	useEffect(() => {
		if (Platform.OS !== "web") {
			initializeNotifications();

			notificationListener =
				Notifications.addNotificationReceivedListener(
					(notification: any) => {
						// console.log(
						// 	"🔔 Received:",
						// 	JSON.stringify(notification, null, 2)
						// );
						storeNotificationOnListener(notification);
					}
				);

			responseListener =
				Notifications.addNotificationResponseReceivedListener(
					async (response) => {
						try {
							// console.log(
							// 	"🔔Response:User interact",
							// 	JSON.stringify(response, null, 2)
							// );
							const { actionIdentifier, notification } = response;
							const notificationId =
								notification.request.identifier;

							if (
								actionIdentifier === "DELETE" ||
								actionIdentifier === "IGNORE_ACTION" ||
								actionIdentifier === "MARK_AS_READ"
							) {
								console.log(
									"Delete button pressed",
									notificationId
								);
								await Notifications.dismissNotificationAsync(
									notificationId
								); // 👈 dismiss it manually
							}

							if (actionIdentifier === "REPLY") {
								const userInput =
									response.userText ??
									response.notification.request.content.data
										?.userText ??
									null;
								console.log(
									"User input:",
									userInput,
									notificationId
								);
								await Notifications.dismissNotificationAsync(
									notificationId
								); // 👈 dismiss it manually
							}

							const url: any =
								response.notification.request.content.data?.url;
							if (url) router.replace(url);
						} catch (error) {
							console.log("error on response lister", error);
						}
					}
				);
		}

		return () => {
			if (Platform.OS !== "web") {
				cleanupNotificationListeners();
			}
		};
	}, []);
	// No UI rendered
	return null;
};

export default NotificationWrapper;
export {
	cancelAllScheduledNotifications,
	cancelScheduledNotification,
	getAllScheduledNotifications,
	getCurrentNotification,
	getCurrentPushToken,
	getError,
	registerForPushNotificationsAsync,
	scheduleNotification,
	sendMultipleNotification,
	sendNotification,
	setupNotificationCategories,
};
