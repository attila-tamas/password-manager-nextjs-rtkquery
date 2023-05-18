import styles from "./toggle.module.scss";

export default function Toggle({ onChange, label, flex, defaultChecked }: any) {
	return (
		<label className={`${styles.container} ${flex && styles.container__flex}`}>
			<input
				className={styles.container__input}
				type="checkbox"
				onChange={onChange}
				defaultChecked={defaultChecked}
			/>
			<span className={styles.container__slider} />
			<p className={styles.container__label}>{label}</p>
		</label>
	);
}
