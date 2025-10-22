import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Report Box",
	slug: "report-box",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	scheme: "reportbox",
	userInterfaceStyle: "automatic",
	newArchEnabled: true,
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
		edgeToEdgeEnabled: true,
		package: "com.hk.reportbox",
		permissions: [
			"WRITE_EXTERNAL_STORAGE",
			"READ_EXTERNAL_STORAGE",
			"MANAGE_EXTERNAL_STORAGE",
			"android.permission.CAMERA",
			"android.permission.RECORD_AUDIO",
			"android.permission.ACCESS_COARSE_LOCATION",
			"android.permission.ACCESS_FINE_LOCATION",
		],
		runtimeVersion: {
			policy: "appVersion",
		},
		intentFilters: [
			{
				action: "VIEW",
				autoVerify: true,
				data: [
					{
						scheme: "https",
						host: "report-box.expo.app",
						pathPrefix: "/",
					},
				],
				category: ["BROWSABLE", "DEFAULT"],
			},
		],
	},
	web: {
		bundler: "metro",
		output: "single",
		favicon: "./assets/web/favicon.png",
	},
	plugins: [
		"expo-router",
		"expo-web-browser",
		"expo-localization",
		"expo-background-task",
		"expo-notifications",
		[
			"expo-splash-screen",
			{
				image: "./assets/images/splash-icon.png",
				imageWidth: 200,
				resizeMode: "contain",
				backgroundColor: "#f1f1f1",
				dark: {
					image: "./assets/images/splash-icon.png",
					backgroundColor: "#343232",
				},
			},
		],
		[
			"expo-camera",
			{
				cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
				microphonePermission:
					"Allow $(PRODUCT_NAME) to access your microphone",
				recordAudioAndroid: true,
			},
		],
		[
			"expo-document-picker",
			{
				iCloudContainerEnvironment: "Production",
			},
		],
		[
			"expo-location",
			{
				locationAlwaysAndWhenInUsePermission:
					"Allow $(PRODUCT_NAME) to use your location.",
			},
		],
		[
			"expo-screen-orientation",
			{
				initialOrientation: "DEFAULT",
			},
		],
		[
			"expo-secure-store",
			{
				configureAndroidBackup: true,
			},
		],
		[
			"expo-build-properties",
			{
				android: {
					enableProguardInReleaseBuilds: true,
					enableShrinkResourcesInReleaseBuilds: true,
					useLegacyPackaging: true,
				},
			},
		],
		[
			"expo-sqlite",
			{
				enableFTS: true,
				useSQLCipher: true,
				android: {
					enableFTS: false,
					useSQLCipher: false,
				},
				ios: {
					customBuildFlags: [
						"-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
					],
				},
			},
		],
		[
			"expo-sensors",
			{
				motionPermission:
					"Allow $(PRODUCT_NAME) to access your device motion",
			},
		],
	],
});
