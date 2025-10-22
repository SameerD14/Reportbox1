import api from "./axiosInstance";

export const createGroup = async (payload: any) => {
	try {
		const response = await api.post("/groups", { ...payload });
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("Error on Create Group");
	}
};
export const getGroups = async () => {
	try {
		const response = await api.get("/groups");
		return response.data;
	} catch (error) {
		console.log("Error on get Group");
	}
};

export const updateGroup = async (id: string, data: any) => {
	try {
		const response = await api.patch(`/groups/${id}`, data);
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("unable to update grp.");
	}
};

export const deleteGroup = async (id: string) => {
	try {
		const response = await api.delete(`/groups/${id}`);
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("unable to update grp.");
	}
};
