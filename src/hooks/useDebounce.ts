import useTimeout from "@hooks/useTimeout";
import { useEffect } from "react";

export default function useDebounce<T>(
	callback: () => void,
	delay: number,
	dependencies: T[]
) {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, []);
}
