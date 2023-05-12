import React from "react";
import styles from "./button.module.scss";

export default function Button(props: any) {
	const getButtonStyle = (color: string) => {
		switch (color) {
			case "primary":
				if (props.noBackdrop) {
					return styles.button__noBackdrop__primary;
				}
				return styles.button__backdrop__primary;

			case "danger":
				if (props.noBackdrop) {
					return styles.button__noBackdrop__danger;
				}
				return styles.button__backdrop__danger;

			default:
				if (props.noBackdrop) {
					return styles.button__noBackdrop__primary;
				}
				return styles.button__backdrop__primary;
		}
	};

	return (
		<input
			type={props.type || "button"}
			value={props.text}
			readOnly
			className={`
						${styles.button} 
						${props.noBackdrop ? styles.button__noBackdrop : styles.button__backdrop}
						${props.flex && styles.button__flex}
						${props.grow && styles.button__grow}
						${getButtonStyle(props.color)}
					`}
			onClick={props.onClick}
		/>
	);
}
