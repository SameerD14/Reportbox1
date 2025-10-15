import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

const WebViewComponent = ({
	webviewRef,
	htmlcontent = "",
	onMessage = () => {},
	setLoaded = () => {},
}: any) => {
	const { primaryColor } = useAppTheme();
	return (
		<View style={styles.container}>
			{Platform.OS !== "web" ? (
				<WebView
					ref={webviewRef}
					originWhitelist={["*"]}
					source={{ html: htmlcontent }}
					onMessage={onMessage}
					onLoadStart={() => {}}
					onLoad={() => {}}
					onLoadEnd={() => setLoaded(true)}
					onFileDownload={({ nativeEvent }: any) => {
						const { downloadUrl } = nativeEvent;
					}}
					style={styles.webview}
					onHttpError={(syntheticEvent) => {
						const { statusCode } = syntheticEvent.nativeEvent;
						console.log("HTTP error status code", statusCode);
					}}
					overScrollMode="content"
					gestureHandling="auto"
					scrollEnabled={false}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					allowFileAccess={true}
					useWebkit={true}
					allowsFullscreenVideo={true}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					setWebContentsDebuggingEnabled={true}
					scalesPageToFit={true}
					setBuiltInZoomControls={false}
					allowsInlineMediaPlayback={true}
					bounces={false}
					zoomEnabled={false}
					nestedScrollEnabled={true}
					renderToHardwareTextureAndroid
					startInLoadingState
					automaticallyAdjustContentInsets={false}
					renderLoading={() => (
						<View style={styles.loaderContainer}>
							<ActivityIndicator
								size="large"
								color={primaryColor}
							/>
						</View>
					)}
					containerStyle={styles.webviewContainer}
					injectedJavaScript={`
                        document.body.style.margin = 0;
                        document.body.style.padding = 0;
                        document.getElementById('chart').style.width = '100%';
                        document.getElementById('chart').style.height = '100%';
                        true;
                    `}
				/>
			) : (
				<iframe
					ref={webviewRef}
					srcDoc={htmlcontent}
					style={{
						width: "100%",
						height: "100%",
						border: "none",
						overflow: "hidden",

						// margin: 1,
					}}
					onLoad={() => setLoaded(true)}
					loading="lazy"
				/>
			)}
		</View>
	);
};

export default WebViewComponent;
const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
	},
	webview: {
		flex: 1,
		backgroundColor: "transparent",
	},
	webviewContainer: {
		margin: 0,
		padding: 0,
		overflow: "hidden",
	},
	loaderContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
});
