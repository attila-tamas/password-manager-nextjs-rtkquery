import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, email: null },
	reducers: {
		setAccessToken: (state, action) => {
			const { accessToken } = action.payload;
			state.token = accessToken;
		},

		logout: (state, _action) => {
			state.token = null;
			state.email = null;
		},

		setCurrentEmail: (state, action) => {
			const { email } = action.payload;
			state.email = email;
		},
	},
});

export default authSlice.reducer;

// actions
export const { setAccessToken, logout, setCurrentEmail } = authSlice.actions;

// selectors
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentEmail = (state: any) => state.auth.email;
