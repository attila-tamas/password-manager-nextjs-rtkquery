import styles from "./input.module.scss";

export default function Input(props: any) {
	// show password functionality
	const getInputType = (type: string) => {
		if (props.show && type === "password") {
			return "text";
		} else {
			return type;
		}
	};

	const handleCopyBtnClick = () => {
		navigator.clipboard.writeText(props.value);
	};

	return (
		<div className={styles.container}>
			<input
				type={getInputType(props.type)}
				placeholder={props.placeholder}
				name={props.name}
				ref={props.reference}
				value={props.value}
				defaultValue={props.defaultValue}
				maxLength={props.maxLength}
				onChange={props.onChange}
				className={props.className || styles.container__input}
				id={props.id}
			/>

			{props.withCopyButton && (
				<div className={`link ${styles.container__copyBtn}`} onClick={handleCopyBtnClick}>
					<span className={styles.container__copyBtn__separator}>&nbsp;</span>
					<p>Copy</p>
				</div>
			)}
		</div>
	);
}
