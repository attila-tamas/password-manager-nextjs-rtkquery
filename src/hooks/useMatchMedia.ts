import { useEffect, useState } from "react";

export default function useMatchMedia(
	mediaQuery: string,
	initialValue: boolean
) {
	const [isMatching, setIsMatching] = useState(initialValue);

	useEffect(() => {
		const watcher = window.matchMedia(mediaQuery);

		setIsMatching(watcher.matches);

		const listener = (matches: any) => {
			setIsMatching(matches.matches);
		};

		watcher.addEventListener("change", listener);

		return () => {
			watcher.removeEventListener("change", listener);
		};
	}, [mediaQuery]);

	return isMatching;
}
