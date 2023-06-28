import { apiSlice } from "@redux/apiSlice";
import { logout, setAccessToken } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: ({ email, password }) => ({
				url: "/auth/register",
				method: "POST",
				body: { email, password },
			}),
		}),

		login: builder.mutation({
			query: ({ email, password }) => ({
				url: "/auth/login",
				method: "POST",
				body: { email, password },
			}),
		}),

		sendLogout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
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
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken } = data;
					dispatch(setAccessToken({ accessToken }));
				} catch (err) {
					console.log(err);
				}
			},
		}),

		getCurrentUser: builder.query({
			query: () => ({
				url: "/auth/current",
				method: "GET",
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useRegisterMutation, //
	useLoginMutation,
	useSendLogoutMutation,
	useRefreshMutation,
	useGetCurrentUserQuery,
} = authApiSlice;
