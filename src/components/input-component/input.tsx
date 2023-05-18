import styles from "./input.module.scss";

export default function Input({ type, placeholder, reference, value, onChange }: any) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			ref={reference}
			value={value}
			onChange={onChange}
			className={styles.input}
		/>
	);
}
