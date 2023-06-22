import styles from "./input.module.scss";
// react
import { LegacyRef, ReactNode, RefObject } from "react";

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
	className,
	children,
	onChange,
}: {
	type: string;
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	maxLength?: number;
	id?: string;
	name?: string;
	reference?: LegacyRef<HTMLInputElement> | RefObject<HTMLInputElement>;
	showPassword?: boolean;
	copyButton?: boolean;
	className?: string;
	children?: ReactNode;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const inputType = () => {
		if (type === "password" && showPassword) return "text";
		return type;
	};

	return (
		<div className={`${styles["input"]} ${className}`}>
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
			/>
			{children}
		</div>
	);
}
