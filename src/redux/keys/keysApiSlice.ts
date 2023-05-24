import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const keysAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) => a.title.localeCompare(b.title),
});

const initialState = keysAdapter.getInitialState();

export const keysApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getKeys: builder.query({
			query: () => ({
				url: "/key",
				method: "GET",
				validateStatus: (response, result) => response.status === 200 && !result.isError,
			}),
			transformResponse: (responseData: any) => {
				const loadedkeys = responseData.map((key: any) => key);
				return keysAdapter.setAll(initialState, loadedkeys);
			},
			providesTags: result => {
				if (result?.ids) {
					return [
						{ type: "Key", id: "LIST" },
						...result.ids.map((id: any) => ({ type: "Key" as const, id })),
					];
				} else {
					return [{ type: "Key", id: "LIST" }];
				}
			},
		}),

		updateKey: builder.mutation({
			query: initialKeyData => ({
				url: "/key/update",
				method: "PATCH",
				body: {
					...initialKeyData,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Key", id: arg.id }],
		}),
	}),
});

export const { useGetKeysQuery, useUpdateKeyMutation } = keysApiSlice;

// returns the query result object
export const selectKeysResult = keysApiSlice.endpoints.getKeys.select("");

// creates memoized selector
const selectKeysData = createSelector(
	selectKeysResult,
	keysResult => keysResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllKeys,
	selectById: selectKeyById,
	selectIds: selectKeyIds,
	// Pass in a selector that returns the keys slice of state
} = keysAdapter.getSelectors((state: any) => selectKeysData(state) ?? initialState);
