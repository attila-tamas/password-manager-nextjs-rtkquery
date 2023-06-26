export type Mutation = {
	trigger: any;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMsg: string;
};

export default function useMutation(hook: any) {
	const [trigger, { isLoading, isSuccess, isError, error }] = hook;

	let errorMsg = "";
	if (isError) errorMsg = (<any>error).data.message;

	const mutation: Mutation = {
		trigger,
		isLoading,
		isSuccess,
		isError,
		errorMsg,
	};

	return mutation;
}
