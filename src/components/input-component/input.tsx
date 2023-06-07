import styles from "./input.module.scss";

import { useState } from "react";

export default function Input({
	type,
	value,
	defaultValue,
	placeholder,
	maxLength,
	name,
	id,
	reference,
	show,
	withCopyButton,
	className,
	onChange,
}: any) {
	const [waitTimer, setWaitTimer] = useState(undefined);
	const [wasCopied, setWasCopied] = useState(false);

	// show password functionality
	const getInputType = (type: string) => {
		if (show && type === "password") {
			return "text";
		} else {
			return type;
		}
	};
	//

	const onCopyButtonClick = () => {
		if (!waitTimer) {
			navigator.clipboard.writeText(value);

			setWasCopied(true);

			setWaitTimer(
				setTimeout(() => {
					setWaitTimer(undefined);
					setWasCopied(false);
				}, 600) as any
			);
		}
	};

	return (
		<div className={styles.container}>
			<input
				type={getInputType(type)}
				placeholder={placeholder}
				name={name}
				ref={reference}
				value={value}
				defaultValue={defaultValue}
				maxLength={maxLength}
				onChange={onChange}
				className={`
					${className || styles.input}
					${wasCopied && styles.input__copied}
				`}
				id={id}
			/>

			{withCopyButton && (
				<>
					<div onClick={onCopyButtonClick} className={`link ${styles.copyBtn}`}>
						<span className={styles.copyBtn__separator}>&nbsp;</span>
						<p>Copy</p>
					</div>

					{wasCopied && <div className={styles.copyFeedback}>Copied</div>}
				</>
			)}
		</div>
	);
}
