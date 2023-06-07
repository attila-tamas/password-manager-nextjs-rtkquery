import styles from "./checkbox.module.scss";

export default function Checkbox({ label, onChange, checked }: any) {
	return (
		<label className={styles.container}>
			<input
				className={styles.checkbox}
				type="checkbox"
				onChange={onChange}
				checked={checked}
			/>
			<p className={styles.label}>{label}</p>
		</label>
	);
}
