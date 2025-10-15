import api from "./axiosInstance";

export const assignUsersToGroup = async (payload: any) => {
	try {
		const response = await api.post("/group-users", payload);
		return response.data;
	} catch (error) {
		console.log("Error On assign user");
	}
};
export const getUsersByGroupId = async (groupId: any) => {
	try {
		const response = await api.get(`/group-users/${groupId}/users`);
		return response.data;
	} catch (error) {
		console.log("Error On assign user");
	}
};
