import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, email: null },
	reducers: {
		setAccessToken: (state, action) => {
			state.token = action.payload;
		},

		logout: (state, _action) => {
			state.token = null;
		},

		setCurrentEmail: (state, action) => {
			state.email = action.payload;
		},
	},
});

export default authSlice.reducer;

// actions
export const { setAccessToken, logout, setCurrentEmail } = authSlice.actions;

// selectors
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentEmail = (state: any) => state.auth.email;
