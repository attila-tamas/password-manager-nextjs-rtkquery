import { useEffect } from "react";

export default function useEffectOnMount(callback: () => void) {
	useEffect(callback, []);
}
