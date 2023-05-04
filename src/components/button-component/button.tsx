import React from "react";
import styles from "./button.module.scss";

export default function Button({ text, color, noBackdrop, flex, type }: any) {
	let button;

	const getButtonStyle = (color: string) => {
		switch (color) {
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

	if (type === "submit") {
		button = (
			<input
				type="submit"
				value={text}
				className={`
						${styles.button} 
						${!noBackdrop && styles.button__backdrop}
						${flex && styles.button__flex}
						${getButtonStyle(color)}
					`}
			/>
		);
	} else {
		button = (
			<button
				className={`
						${styles.button} 
						${!noBackdrop && styles.button__backdrop}
						${flex && styles.button__flex}
						${getButtonStyle(color)}
					`}>
				{text}
			</button>
		);
	}

	return button;
}
