import { apiSlice } from "@redux/apiSlice";

export const validationApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		validateRegistrationEmail: builder.mutation({
			query: email => ({
				url: "/validate/register/email",
				method: "POST",
				body: { email },
			}),
		}),

		validateRegistrationPassword: builder.mutation({
			query: password => ({
				url: "/validate/register/password",
				method: "POST",
				body: { password },
			}),
		}),

		validateLoginEmail: builder.mutation({
			query: email => ({
				url: "/validate/login/email",
				method: "POST",
				body: { email },
			}),
		}),

		validateOtp: builder.mutation({
			query: token => ({
				url: "/validate/otp",
				method: "POST",
				body: { token },
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useValidateRegistrationEmailMutation,
	useValidateRegistrationPasswordMutation,
	useValidateLoginEmailMutation,
	useValidateOtpMutation,
} = validationApiSlice;
