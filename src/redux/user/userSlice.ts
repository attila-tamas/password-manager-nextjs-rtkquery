import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { persist: null, email: null },
	reducers: {
		setPersist: (state, action) => {
			const { persist } = action.payload;
			state.persist = persist;
		},

		setCurrentEmail: (state, action) => {
			const { email } = action.payload;
			state.email = email;
		},
	},
});

export default userSlice.reducer;

// actions
export const { setPersist, setCurrentEmail } = userSlice.actions;

// selectors
export const selectPersist = (state: any) => state.user.persist;
export const selectCurrentEmail = (state: any) => state.user.email;
