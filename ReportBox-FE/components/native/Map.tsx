import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Linking, Platform, StyleSheet, View } from "react-native";
import WebViewComponent from "../WebViewComponent";
const htmlcontent = /*html*/ `
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leaflet Map</title>
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            crossorigin=""
        />
        <style>
            html, body, #map {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            .leaflet-control-attribution {
                display: none !important;
            }
        </style>
        </head>
        <body>
        <div id="map"></div>
        <script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            crossorigin=""
        >
        </script>
        <script>
                const isInIframe = window.self !== window.top;
                const isInRNWebView = typeof window?.ReactNativeWebView !== 'undefined';
                const isElectron = navigator.userAgent.toLowerCase().includes('electron');
                function sendMsg(action = null, values = null, reason = null, isZoomed = null) {
                    if (isInIframe) {
                        const payload = typeof action === "object" ? { ...action, source: "line-chart", values } : { action, source: "line-chart", values };
                        try {
                            window.parent.postMessage(payload, "*");
                        } catch (error) {
                            console.error("Failed to post message from", error);
                        }
                        console.log("Running inside an iframe",isInIframe);
                    } else if (isInRNWebView) {
                        window.ReactNativeWebView?.postMessage(
                            JSON.stringify({
                                action,
                                values,
                                reason,
                                isZoomed,
                            })
                        );
                    }else{
                        console.log("not in ifram nor webview");
                    }
                }
                /* -------------------------------------------------------------------------- */
                const iconMap = {
                    police: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991102.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    }),
                    hospital: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    }),
                    hotel: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/168/168588.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    })
                };

                /* -------------------------------------------------------------------------- */

                var map = L.map('map').setView([20, 78], 4); // Default center on India

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                var markers=[];

                // This function can be called from React Native via injected JS
                window.setLocationFromApp = function(lat, lon,address="Hello") {

                    map.setView([lat, lon], 15);

                    // Clear existing markers
                    markers.forEach((m) => map.removeLayer(m));
                    markers = [];

                    // ✅ Add new marker
                    const marker = L.marker([lat, lon]).addTo(map)
                        //.bindPopup(address)
                        .openPopup();

                    markers.push(marker);
                };
                /* -------------------------------------------------------------------------- */
                 function setMarkersOnLocations(locations) {

                    // Clear previous markers
                    markers.forEach((m) => map.removeLayer(m));
                    markers = [];

                    // Add new markers
                    locations.forEach((loc) => {
                        const icon = iconMap[loc.type] || undefined;
                        const marker = L.marker([loc.lat, loc.lon], { icon }).addTo(map);
                        if (loc.title) marker.bindPopup(loc.title);
                        markers.push(marker);
                    });

                    // Fit map to markers
                    const group = new L.featureGroup(markers);
                    map.fitBounds(group.getBounds());

                }

        </script>
        </body>
        </html>
    `;

/* -------------------------------------------------------------------------- */
const markers = [
	{ lat: 19.076, lon: 72.8777, title: "Mumbai Police", type: "police" },
	{ lat: 28.6139, lon: 77.209, title: "Delhi Hospital", type: "hospital" },
	{ lat: 13.0827, lon: 80.2707, title: "Chennai Hotel", type: "hotel" },
];
/* -------------------------------------------------------------------------- */
export const getLocationDetails = async () => {
	const { status, canAskAgain } =
		await Location.requestForegroundPermissionsAsync();

	if (status !== "granted") {
		if (!canAskAgain) {
			// User denied permanently, open settings
			Alert.alert(
				"Location Permission",
				"Location access is denied and cannot be requested again. Please enable it manually in settings.",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Open Settings",
						onPress: () => Linking.openSettings(),
					},
				]
			);
		}
		return;
	}
	let loc: any = await Location.getCurrentPositionAsync({
		accuracy: 5,
	});
	let geo: any;
	if (Platform.OS === "web") {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc?.coords?.latitude}&lon=${loc?.coords?.longitude}`
			);
			geo = await response.json();
		} catch (error) {
			console.warn("Reverse geocode failed on web:", error);
			return "Unknown location";
		}
	} else {
		geo = await Location.reverseGeocodeAsync(loc.coords);
	}
	return { geo, loc };
};
/* -------------------------------------------------------------------------- */
export default function LeafletMapWebView({ location, setLocation }: any) {
	const [locationReady, setLocationReady] = useState(false);
	const webviewRef = useRef<any>(null);
	/* -------------------------------------------------------------------------- */
	const addMultipleMarkers = () => {
		const jsCodes = `
                        setMarkersOnLocations(${JSON.stringify(markers)});
                        true;
                        `;
		if (Platform.OS === "web") {
			webviewRef.current?.contentWindow.setMarkersOnLocations?.(markers);
		} else {
			webviewRef.current?.injectJavaScript(jsCodes);
		}
	};
	const setMyCurrentLocationOnChart = (loc: any, geo: any) => {
		const jsCode = `setLocationFromApp(${loc?.coords?.latitude},${
			loc?.coords?.longitude
		},"${geo[0]?.formattedAddress || "Hello"}");true;`;

		if (Platform.OS === "web") {
			webviewRef.current?.contentWindow.setLocationFromApp?.(
				loc?.coords?.latitude,
				loc?.coords?.longitude,
				geo?.display_name || "Unknown location"
			);
		} else {
			webviewRef.current?.injectJavaScript(jsCode);
		}
	};
	const getGeolocation = async (loc: any) => {
		let geo;
		if (Platform.OS === "web") {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc?.coords?.latitude}&lon=${loc?.coords?.longitude}`
				);
				geo = await response.json();
			} catch (error) {
				console.warn("Reverse geocode failed on web:", error);
				return "Unknown location";
			}
		} else {
			geo = await Location.reverseGeocodeAsync(loc.coords);
		}
		return geo;
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Permission to access location was denied");
				return;
			}
			let loc: any = await Location.getCurrentPositionAsync({
				accuracy: 5,
			});
			let geo = await getGeolocation(loc);

			setMyCurrentLocationOnChart(loc, geo);
			setLocation(geo[0]?.formattedAddress);
			/* ---------------------------- Update on Webview --------------------------- */
		})();
	}, [locationReady, location]);

	/* -------------------------------------------------------------------------- */
	const onMessage = async (event: any) => {
		const message = JSON.parse(event.nativeEvent.data);
		const { action, values, reason, isZoomed } = message;
		// console.log(action, values);
	};
	/* -------------------------------------------------------------------------- */
	return (
		<View style={styles.container}>
			{Platform.OS === "web" ? (
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
					onLoad={() => setLocationReady(true)}
				/>
			) : (
				<WebViewComponent
					webviewRef={webviewRef}
					htmlcontent={htmlcontent}
					onMessage={onMessage}
					setLoaded={setLocationReady}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		borderRadius: 10,
		overflow: "hidden",
	},
	webview: {
		flex: 1,
	},
});
