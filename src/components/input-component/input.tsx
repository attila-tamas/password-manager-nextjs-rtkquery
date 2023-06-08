// styles
import styles from "./input.module.scss";
// react
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
	// copy functionality states
	const [waitTimer, setWaitTimer] = useState(undefined);
	const [wasCopied, setWasCopied] = useState(false);
	//

	// show password functionality
	const getInputType = (type: string) => {
		if (show && type === "password") {
			return "text";
		} else {
			return type;
		}
	};

	// copy input value functionality
	const onCopyButtonClick = () => {
		if (!waitTimer) {
			navigator.clipboard.writeText(value);

			setWasCopied(true);

			// show an overlay for 600ms as feedback to the user that the value has been copied
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
					{/* add a copy button to the input */}
					<div onClick={onCopyButtonClick} className={`link ${styles.copyBtn}`}>
						<span className={styles.copyBtn__separator}>&nbsp;</span>
						<p>Copy</p>
					</div>

					{/* display an overlay on copy button click as a feeadback to the user */}
					{wasCopied && <div className={styles.copyFeedback}>Copied</div>}
				</>
			)}
		</div>
	);
}
