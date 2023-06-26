import useDebounce from "@hooks/useDebounce";

export type Validation = {
	validate: any;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMsg: string;
};

export default function useLiveValidation(inputValue: string, hook: any) {
	const [validate, { isLoading, isSuccess, isError, error }] = hook;

	useDebounce(
		async () => {
			await validate(inputValue);
		},
		600,
		[inputValue]
	);

	let errorMsg = "";
	if (isError) errorMsg = (<any>error).data.message;

	const result: Validation = {
		validate,
		isLoading,
		isSuccess,
		isError,
		errorMsg,
	};

	return result;
}
