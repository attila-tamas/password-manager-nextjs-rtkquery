import styles from "./input.module.scss";

export default function Input({ type, placeholder, reference, value, onChange, show }: any) {
	// show password functionality
	if (show && type === "password") {
		type = "text";
	}

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
