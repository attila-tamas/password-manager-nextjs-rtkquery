import isDeepEqual from "fast-deep-equal/react";
import { useRef } from "react";
import useDebounce from "./useDebounce";

export type Query = {
	trigger: any;
	data: any;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMsg: string;
};

export default function useLazyQuery(queryParams: object, hook: any) {
	const [trigger, { data, isLoading, isSuccess, isError, error }] = hook;

	const queryParamsRef = useRef(queryParams);

	if (!isDeepEqual(queryParamsRef.current, queryParams)) {
		queryParamsRef.current = queryParams;
	}

	useDebounce(
		async () => {
			await trigger(queryParams);
		},
		400,
		[queryParamsRef.current]
	);

	let errorMsg = "";
	if (isError) errorMsg = (<any>error).data.message;

	const query: Query = {
		trigger,
		data,
		isLoading,
		isSuccess,
		isError,
		errorMsg,
	};

	return query;
}
