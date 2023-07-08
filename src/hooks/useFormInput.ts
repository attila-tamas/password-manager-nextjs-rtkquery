import { ChangeEvent, useState } from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

type Props = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	changeValue: (value: string) => void;
};

export default function useFormInput(initialValue: string) {
	const [value, setValue] = useState(initialValue);

	useEffectOnUpdate(() => {
		setValue(initialValue);
	}, [initialValue]);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setValue(event.target.value);
	}

	function changeValue(value: string): void {
		setValue(value);
	}

	const props: Props = {
		value,
		onChange: handleChange,
		changeValue,
	};

	return props;
}
