import { apiSlice } from "../api/apiSlice";
import { logout } from "../auth/authSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		resendVerificationEmail: builder.mutation({
			query: email => ({
				url: "/user/resend-verification-email",
				method: "POST",
				body: { email },
			}),
		}),

		activateAccount: builder.mutation({
			query: token => ({
				url: `/user/activate?token=${token}`,
				method: "GET",
			}),
		}),

		deleteAccount: builder.mutation({
			query: () => ({
				url: "user/delete",
				method: "DELETE",
			}),
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
	}),
	overrideExisting: false,
});

export const {
	useResendVerificationEmailMutation, //
	useActivateAccountMutation,
	useDeleteAccountMutation,
} = userApiSlice;
