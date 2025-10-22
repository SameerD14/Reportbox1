import api from "./axiosInstance";

export const sendOrUpdateToken = async (
	userId: string,
	token: string | undefined
) => {
	try {
		const response = await api.post("/token", { userId, token });
		return response.data;
	} catch (error) {
		console.log(
			"Enable to store notify token",
			JSON.stringify(error, null, 1)
		);
	}
};
export const getTokensWithUser = async () => {
	try {
		const response = await api.get("/token");
		return response.data;
	} catch (error) {
		console.log("Enable to get token", JSON.stringify(error, null, 1));
	}
};

export const getTokensByUserID = async (userId: string) => {
	try {
		const response = await api.get(`/token/${userId}`);
		return response.data;
	} catch (error) {
		console.log(
			"UnEnable to get token by id",
			JSON.stringify(error, null, 1)
		);
	}
};

export const deleteTokenByUserId = async (userId: string) => {
	try {
		const res = await api.delete(`/token/${userId}`);
		return res.data;
	} catch (error) {
		console.error("Unable to delete token", error);
	}
};
