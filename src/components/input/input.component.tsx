import styles from "./input.module.scss";
// react
import { ChangeEvent, MutableRefObject, ReactNode } from "react";
// @hooks
import { Validation } from "@hooks/useValidation";
// @components
import Icon, { icons } from "@components/icon/icon";
import Spinner from "@components/spinner/spinner.component";
// @util
import { pixelToEm } from "@util/pixelConverter";

type Props = {
	type: string;
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	maxLength?: number;
	id?: string;
	name?: string;
	readonly?: boolean;
	reference?: MutableRefObject<HTMLInputElement | null>;
	showPassword?: boolean;
	copyButton?: boolean;
	className?: string;
	children?: ReactNode;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	validation?: Validation;
};

export default function Input({
	type = "text",
	value,
	defaultValue,
	placeholder,
	maxLength,
	id,
	name,
	readonly,
	reference,
	showPassword,
	className,
	children,
	onChange,
	validation,
}: Props) {
	function inputClasses(): string {
		let classes = `${styles["input"]} ${className}`;

		if (validation?.errorMsg) classes += ` ${styles["input--error"]}`;

		return classes;
	}

	function inputType(): string {
		if (type === "password" && showPassword) return "text";
		return type;
	}

	function validationIcon(): undefined | JSX.Element {
		if (validation?.isLoading) {
			return <Spinner size={24} />;
		} else if (validation?.isSuccess) {
			return (
				<Icon
					icon={icons.tick}
					size={pixelToEm(24)}
					color="var(--color-primary)"
				/>
			);
		} else if (validation?.errorMsg) {
			return (
				<Icon
					icon={icons.cross}
					size={pixelToEm(24)}
					color="var(--color-error)"
				/>
			);
		}
		return;
	}

	// make sure aria-invalid is either true or false
	function isAriaInvalid(): boolean {
		if (validation?.errorMsg) return true;
		return false;
	}

	return (
		<div className={inputClasses()}>
			<input
				type={inputType()}
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				id={id}
				name={name}
				readOnly={readonly}
				ref={reference}
				maxLength={maxLength}
				onChange={onChange}
				aria-invalid={isAriaInvalid()}
			/>
			{children}
			{validationIcon()}
		</div>
	);
}
