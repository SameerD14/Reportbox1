import api from "./axiosInstance";

export const assignRightsToGroup = async (payload: any) => {
	try {
		const response = await api.post("/group-rights", payload);
		return response.data;
	} catch (error) {
		console.log("Error On assign Rights");
	}
};
export const getRightsByGroupId = async (groupId: any) => {
	try {
		const response = await api.get(`/group-rights/${groupId}/rights`);
		return response.data;
	} catch (error) {
		console.log("Error On getting Rights by group ID");
	}
};
