import styles from "./input.module.scss";
// react
import { MutableRefObject, ReactNode } from "react";

type Props = {
	type: string;
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	maxLength?: number;
	id?: string;
	name?: string;
	reference?: MutableRefObject<HTMLInputElement | null>;
	showPassword?: boolean;
	copyButton?: boolean;
	error?: boolean;
	className?: string;
	children?: ReactNode;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
	type = "text",
	value,
	defaultValue,
	placeholder,
	maxLength,
	id,
	name,
	reference,
	showPassword,
	error,
	className,
	children,
	onChange,
}: Props) {
	function inputType(): string {
		if (type === "password" && showPassword) return "text";
		return type;
	}

	return (
		<div
			className={`
				${styles["input"]}
				${error && styles["input--error"]}
				${className}
			`}
		>
			<input
				type={inputType()}
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				id={id}
				name={name}
				ref={reference}
				maxLength={maxLength}
				onChange={onChange}
				aria-invalid={error}
			/>
			{children}
		</div>
	);
}
