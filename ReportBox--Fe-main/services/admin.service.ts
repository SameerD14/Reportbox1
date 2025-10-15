import api from "./axiosInstance";
/* -------------------------------------------------------------------------- */
export const getUsersList = async () => {
	try {
		const response = await api.get("/users");
		return response.data;
	} catch (error) {
		console.log(
			"error on getting users list",
			JSON.stringify(error, null, 1)
		);
	}
};
/* -------------------------------------------------------------------------- */
export const getUsersDetailsByID = async (id: string) => {
	try {
		const response = await api.get(`/users/details/${id}`);
		return response.data;
	} catch (error: any) {
		console.log(
			"error on getting users list by id",
			JSON.stringify(error, null, 1)
		);
	}
};
/* -------------------------------------------------------------------------- */
