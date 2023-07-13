import useEffectOnMount from "./useEffectOnMount";
import useEffectOnUpdate from "./useEffectOnUpdate";
import useTimeout from "./useTimeout";

export default function useDebounce<T>(
	callback: () => void,
	delay: number,
	dependencies: T[]
) {
	const { reset, clear } = useTimeout(callback, delay);
	useEffectOnUpdate(reset, [...dependencies, reset]);
	useEffectOnMount(clear);
}
