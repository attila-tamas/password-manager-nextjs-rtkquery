import copy from "copy-to-clipboard";
import { useState } from "react";

export default function useCopyToClipboard(): [
	(text: string, options?: object) => void,
	{ value: string; success: boolean }
] {
	const [value, setValue] = useState("");
	const [success, setSuccess] = useState(false);

	function copyToClipboard(text: string, options?: object): void {
		const result = copy(text, options);
		if (result) setValue(text);
		setSuccess(result);
	}

	if (success) {
		setTimeout(() => setSuccess(false), 1000);
	}

	return [copyToClipboard, { value, success }];
}
