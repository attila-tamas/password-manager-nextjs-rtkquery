import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { persist: null },
	reducers: {
		setPersist: (state, action) => {
			const { persist } = action.payload;
			state.persist = persist;
		},
	},
});

export default userSlice.reducer;

// actions
export const { setPersist } = userSlice.actions;

// selectors
export const selectPersist = (state: any) => state.user.persist;
