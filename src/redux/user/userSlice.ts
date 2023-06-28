import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { persist: null, email: null },
	reducers: {
		setPersist: (state, action) => {
			state.persist = action.payload;
		},
	},
});

export default userSlice.reducer;

// actions
export const { setPersist } = userSlice.actions;

// selectors
export const selectPersist = (state: any) => state.user.persist;
