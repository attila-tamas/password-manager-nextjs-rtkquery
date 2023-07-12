import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, isActive: null },
	reducers: {
		setAccessToken: (state, action) => {
			const { accessToken } = action.payload;
			state.token = accessToken;
		},

		logout: (state, _action) => {
			state.token = null;
		},

		setIsActive: (state, action) => {
			const { isActive } = action.payload;
			state.isActive = isActive;
		},
	},
});

export default authSlice.reducer;

// actions
export const { setAccessToken, logout, setIsActive } = authSlice.actions;

// selectors
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectIsActive = (state: any) => state.auth.isActive;
