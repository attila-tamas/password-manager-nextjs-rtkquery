import styles from "./button.module.scss";

export default function Button({
	type,
	text,
	color,
	disabled,
	noBackdrop,
	flex,
	grow,
	onClick,
}: any) {
	const getButtonColor = (color: string) => {
		switch (color) {
			case "primary":
				if (noBackdrop) {
					return styles.button__noBackdrop__primary;
				}
				return styles.button__backdrop__primary;

			case "danger":
				if (noBackdrop) {
					return styles.button__noBackdrop__danger;
				}
				return styles.button__backdrop__danger;

			default:
				if (noBackdrop) {
					return styles.button__noBackdrop__default;
				}
				return styles.button__backdrop__default;
		}
	};

	return (
		<input
			type={type || "button"}
			value={text}
			disabled={disabled}
			readOnly
			className={`
						${styles.button}
						${noBackdrop ? styles.button__noBackdrop : styles.button__backdrop}
						${flex && styles.button__flex}
						${grow && styles.button__grow}
						${getButtonColor(color)}
					`}
			onClick={onClick}
		/>
	);
}
