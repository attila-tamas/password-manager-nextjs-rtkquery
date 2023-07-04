import { RefObject } from "react";
import useEventListener from "./useEventListener";

export default function useClickOutside(
	ref: RefObject<any>,
	callback: (event: any) => void
) {
	useEventListener(
		"click",
		event => {
			if (ref.current == null || ref.current.contains(event.target))
				return;
			callback(event);
		},
		document
	);
}
