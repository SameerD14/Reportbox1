import api from "./axiosInstance";

export const createRights = async (payload: any) => {
	try {
		const response = await api.post("/rights", { ...payload });
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("Error on Create rights");
	}
};
export const getRights = async () => {
	try {
		const response = await api.get("/rights");
		return response.data;
	} catch (error) {
		console.log("Error on get rights");
	}
};

export const updateRight = async (id: string, data: any) => {
	try {
		const response = await api.patch(`/rights/${id}`, data);
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("unable to update rights.");
	}
};

export const deleteRight = async (id: string) => {
	try {
		const response = await api.delete(`/rights/${id}`);
		return {
			status: true,
			res: response.data,
		};
	} catch (error) {
		console.log("unable to update rights.");
	}
};
