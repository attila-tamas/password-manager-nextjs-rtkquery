import useEffectOnUpdate from "./useEffectOnUpdate";

export default function useSuccess(
	callback: () => void,
	handler: { isSuccess: boolean }
) {
	useEffectOnUpdate(() => {
		if (handler.isSuccess) {
			callback();
		}
	}, [handler.isSuccess]);
}
