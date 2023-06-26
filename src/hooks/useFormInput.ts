import { ChangeEvent, useState } from "react";

type Props = {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function useFormInput(initialValue: string) {
	const [value, setValue] = useState(initialValue);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setValue(event.target.value);
	}

	const props: Props = {
		value: value,
		onChange: handleChange,
	};

	return props;
}
