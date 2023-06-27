import { useEffect, useRef } from "react";

export default function useEffectOnUpdate<T>(
	callback: () => void,
	dependencies: T[]
) {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		callback();
	}, [...dependencies]);
}
