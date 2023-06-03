import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { emailToVerify: null },
	reducers: {
		setEmailToVerify: (state, action) => {
			const { email } = action.payload;
			state.emailToVerify = email;
		},
	},
});

export default userSlice.reducer;

// actions
export const { setEmailToVerify } = userSlice.actions;

// selectors
export const selectEmailToVerfy = (state: any) => state.user.emailToVerify;
