import React from "react";
import styles from "./button.module.scss";

export default function Button({ text, color, noBackdrop, flex, type, grow }: any) {
	let button;

	const getButtonStyle = (color: string) => {
		switch (color) {
			case "primary":
				if (noBackdrop) {
					return styles.button__primary;
				}
				return styles.button__backdrop__primary;

			case "danger":
				if (noBackdrop) {
					return styles.button__danger;
				}
				return styles.button__backdrop__danger;

			default:
				if (noBackdrop) {
					return styles.button__primary;
				}
				return styles.button__backdrop__primary;
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
						${grow && styles.button__grow}
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
						${grow && styles.button__grow}
						${getButtonStyle(color)}
					`}>
				{text}
			</button>
		);
	}

	return button;
}
