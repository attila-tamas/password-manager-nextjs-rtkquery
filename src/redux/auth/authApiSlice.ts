import { apiSlice } from "@redux/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: credentials => ({
				url: "/auth/register",
				method: "POST",
				body: { ...credentials },
			}),
		}),

		login: builder.mutation({
			query: credentials => ({
				url: "/auth/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),

		sendLogout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			// clear the token and reset the API state after the cookie is cleared
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logout(""));
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),

		refresh: builder.mutation({
			query: () => ({
				url: "/auth/refresh",
				method: "GET",
			}),
			// get and set the new access token after the query is fulfilled
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken } = data;
					dispatch(setCredentials({ accessToken }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
	overrideExisting: false,
});

export const {
	useRegisterMutation, //
	useLoginMutation,
	useSendLogoutMutation,
	useRefreshMutation,
} = authApiSlice;
