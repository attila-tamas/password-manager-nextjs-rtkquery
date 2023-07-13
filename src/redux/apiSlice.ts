// npm
import {
	BaseQueryApi,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// reducers
import { logout, setAccessToken } from "@redux/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api"
			: "https://keystone-api-pvkd.onrender.com/api",
	credentials: "include",
	prepareHeaders: (headers: Headers, { getState }: any) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (
	args: string | FetchArgs, // request url, method, body
	api: BaseQueryApi, // signal, dispatch, getState()
	extraOptions: object
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 403) {
		// send refresh token to get new access token
		const refreshResult = await baseQuery(
			"/auth/refresh",
			api,
			extraOptions
		);

		if (refreshResult?.data) {
			// store the new token
			api.dispatch(setAccessToken({ ...refreshResult.data }));

			// retry original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			// log out the user when the refresh token is expired and we do not get a new access token
			api.dispatch(logout(""));
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Key"], // data tag types for caching
	endpoints: () => ({}),
});
