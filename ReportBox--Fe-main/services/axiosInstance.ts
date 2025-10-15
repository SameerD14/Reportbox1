import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
var id: any;

const BASEURl = "http://10.191.32.188:8080/api";

const api = axios.create({
	baseURL: BASEURl,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// 🚫 Block requests when offline
api.interceptors.request.use(
	async (config) => {
		const state = await NetInfo.fetch();

		if (!state.isConnected) {
			// Show toast only if not already shown
			id = Toast.show({
				type: "error",
				text1: "You are offline",
				text2: "Please check your internet connection.",
				autoHide: false,
				swipeable: false,
			});

			return Promise.reject({
				message: "📴 Offline - blocking request",
				isOffline: true,
			});
		}

		return config;
	},
	(error) => Promise.reject(error)
);

NetInfo.addEventListener((state) => {
	if (state.isConnected) {
		Toast.hide(id);
	}
});
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.isOffline) {
			id = Toast.show({
				type: "error",
				text1: "You are offline",
				text2: "Please check your internet connection.",
				autoHide: false,
				swipeable: false,
			});
		} else if (error.response) {
		} else if (error.request) {
		} else {
		}

		return Promise.reject(error);
	}
);

export default api;

export const uploadImageToCloudinary1 = async (imageUri: string) => {
	try {
		if (!imageUri) {
			console.log("Image URI is missing.");
		}
		const fileInfo = await FileSystem.getInfoAsync(imageUri);
		if (!fileInfo.exists) {
			console.log("File does not exist at URI: " + imageUri);
		}
		const fileName = imageUri.split("/").pop() || "photo.jpg";
		const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

		const formData = new FormData();
		formData.append("image", {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		const res = await api.post(`/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.data;
	} catch (err: any) {
		console.log("Upload failed:", err.message);
		return false;
	}
};
export const uploadImageToCloudinary = async (imageUri: string) => {
  try {
    if (!imageUri) {
      console.log("Image URI is missing.");
      return;
    }

    let fileUri = imageUri;

    // ✅ Handle content:// URIs (Android 13+)
    if (fileUri.startsWith("content://")) {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const tempUri = FileSystem.cacheDirectory + "temp-upload.jpg";
      await FileSystem.writeAsStringAsync(tempUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      fileUri = tempUri;
     
    }

    // ✅ Define filename and MIME type
    const fileName = fileUri.split("/").pop() || "photo.jpg";
    const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

    // ✅ Create form data
    const formData = new FormData();
    formData.append("image", {
      uri: fileUri,
      type: fileType,
      name: fileName,
    } as any);

    // ✅ Upload to backend (Express)
    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    });

    console.log("Upload successful:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("Upload failed:", err.message);
    return false;
  }
};
