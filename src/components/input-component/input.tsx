import React from "react";
import styles from "./input.module.scss";

export default function Input({ type, checked, placeholder }: any) {
	let isCheckbox = false;
	let isChecked = checked ? true : false;

	const getInputClass = (type: any) => {
		if (type === "checkbox") {
			isCheckbox = true;
			return styles.checkbox;
		}
		return styles.input;
	};

	const checkBoxHandler = () => {
		isChecked = !isChecked;
		return isChecked;
	};

	return (
		<input
			type={type}
			placeholder={placeholder}
			className={getInputClass(type)}
			onClick={isCheckbox ? checkBoxHandler : undefined}
			defaultChecked={isCheckbox && isChecked}
		/>
	);
}
