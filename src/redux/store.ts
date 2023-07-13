// npm
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
// @redux
import { apiSlice } from "@redux/apiSlice";
// reducers
import authReducer from "@redux/auth/authSlice";
import userReducer from "@redux/user/userSlice";
// storage for "redux-persist"
import storage from "@redux/sync-storage";

const reducers = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	user: userReducer,
});

const makeStore = ({ isServer }: any) => {
	if (isServer) {
		// if it's on the server side, create a store without the persisted reducer

		return configureStore({
			reducer: reducers,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					// avoid typescript error
					serializableCheck: {
						ignoredActions: [
							FLUSH,
							REHYDRATE,
							PAUSE,
							PERSIST,
							PURGE,
							REGISTER,
						],
					},
				}).concat(apiSlice.middleware),
		});
	} else {
		// if it's on the client side, create a store which will persist

		const persistConfig = {
			key: "user", // name for the storage
			whitelist: ["user"], // whitelist reducers to persist
			storage, // storage for the persisted states
		};

		const persistedReducer = persistReducer(persistConfig, reducers);

		const store = configureStore({
			reducer: persistedReducer,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					// avoid typescript error
					serializableCheck: {
						ignoredActions: [
							FLUSH,
							REHYDRATE,
							PAUSE,
							PERSIST,
							PURGE,
							REGISTER,
						],
					},
				}).concat(apiSlice.middleware),
		});

		return store;
	}
};

export const wrapper = createWrapper(makeStore);
