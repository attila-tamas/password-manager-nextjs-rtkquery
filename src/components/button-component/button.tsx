import React from "react";
import styles from "./button.module.scss";

export default function Button({ text, type, noBackdrop, flex }: any) {
	const getButtonType = (type: string) => {
		switch (type) {
			case "success":
				if (noBackdrop) {
					return styles.button__success;
				}
				return styles.button__backdrop__success;

			case "danger":
				if (noBackdrop) {
					return styles.button__danger;
				}
				return styles.button__backdrop__danger;

			default:
				if (noBackdrop) {
					return styles.button__success;
				}
				return styles.button__backdrop__success;
		}
	};

	return (
		<button
			className={`
				${styles.button} 
				${!noBackdrop && styles.button__backdrop}
				${flex && styles.button__flex}
				${getButtonType(type)}
			`}>
			{text}
		</button>
	);
}
