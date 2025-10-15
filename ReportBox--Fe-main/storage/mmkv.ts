import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({ id: "mmkv-storage" });
// set mmkv 
export const setMMKV = (key: string, value: any) => {
	storage.set(key, JSON.stringify(value));
};

// get mmkv 
export const getMMKV = (key: string) => {
	const value = storage.getString(key);
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
};

//remove mmkv
export const removeMMKV = (key: string) => {
	storage.delete(key);
};

//check mmkv 
export const hasMMKV = (key: string) => {
	return storage.contains(key);
};

// mmkv keys 
export const MMKV_KEYS = {
	NOTIFICATION_KEY: "notifications",
	NOTIFICATION_STATUS_KEY: "notificationStatus",
} as const;
