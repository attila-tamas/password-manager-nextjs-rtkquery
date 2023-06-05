import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "./sync-storage";

import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";

const reducers = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	user: userReducer,
});

const makeStore = ({ isServer }: any) => {
	if (isServer) {
		// if it's on server side, create a store without the persisted reducer
		return configureStore({
			reducer: reducers,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
				}).concat(apiSlice.middleware),
		});
	} else {
		// If it's on client side, create a store which will persist
		const persistConfig = {
			key: "user",
			whitelist: ["user"],
			storage,
		};

		const persistedReducer = persistReducer(persistConfig, reducers);

		const store = configureStore({
			reducer: persistedReducer,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
				}).concat(apiSlice.middleware),
		});

		return store;
	}
};

export const wrapper = createWrapper(makeStore);
