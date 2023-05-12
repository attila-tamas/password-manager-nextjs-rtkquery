import styles from "./checkbox.module.scss";

import React from "react";

export default function Checkbox({ label, onChange, defaultChecked }: any) {
	return (
		<label className={styles.container}>
			<input
				className={styles.container__checkbox}
				type="checkbox"
				onChange={onChange}
				defaultChecked={defaultChecked}
			/>
			<p className={styles.container__label}>{label}</p>
		</label>
	);
}
