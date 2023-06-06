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

		requestPasswordChange: builder.mutation({
			query: email => ({
				url: "/user/request-password-change",
				method: "POST",
				body: { email },
			}),
		}),

		changePassword: builder.mutation({
			query: ({ id, token, password }) => ({
				url: `/user/change-password?id=${id}&token=${token}`,
				method: "POST",
				body: { password },
			}),
		}),

		deleteAccount: builder.mutation({
			query: () => ({
				url: "/user/delete",
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
	useResendVerificationEmailMutation,
	useActivateAccountMutation,
	useRequestPasswordChangeMutation,
	useChangePasswordMutation,
	useDeleteAccountMutation,
} = userApiSlice;
