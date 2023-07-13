import { useState } from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

export type Validation = {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMsg: string;
};

export default function useValidation(inputValue: string, hook: any) {
	const [errorMsg, setErrorMsg] = useState("");

	useEffectOnUpdate(() => {
		setErrorMsg(hook.errorMsg);
	}, [hook.isError]);

	useEffectOnUpdate(() => {
		if (errorMsg !== "") setErrorMsg("");
	}, [inputValue]);

	const result: Validation = {
		isLoading: hook.isLoading,
		isSuccess: hook.isSuccess,
		isError: hook.isError,
		errorMsg,
	};

	return result;
}
