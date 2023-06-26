import { useState } from "react";

type Props = {
	value: boolean;
	toggleValue: () => void;
};

export default function useToggle(initialValue: boolean) {
	const [value, setValue] = useState(initialValue);

	function handleToggle(): void {
		setValue((currentValue: boolean) => !currentValue);
	}

	const props: Props = {
		value: value,
		toggleValue: handleToggle,
	};

	return props;
}
