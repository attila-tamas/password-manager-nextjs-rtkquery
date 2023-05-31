import styles from "./input.module.scss";

import { useState } from "react";

export default function Input(props: any) {
	const [waitTimer, setWaitTimer] = useState(undefined);
	const [wasCopied, setWasCopied] = useState(false);

	// show password functionality
	const getInputType = (type: string) => {
		if (props.show && type === "password") {
			return "text";
		} else {
			return type;
		}
	};

	const onCopyButtonClick = () => {
		if (!waitTimer) {
			navigator.clipboard.writeText(props.value);

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
				type={getInputType(props.type)}
				placeholder={props.placeholder}
				name={props.name}
				ref={props.reference}
				value={props.value}
				defaultValue={props.defaultValue}
				maxLength={props.maxLength}
				onChange={props.onChange}
				className={`
					${props.className || styles.container__input}
					${wasCopied && styles.container__copied}
				`}
				id={props.id}
			/>

			{props.withCopyButton && (
				<>
					<div
						className={`link ${styles.container__copyBtn}`}
						onClick={onCopyButtonClick}>
						<span className={styles.container__copyBtn__separator}>&nbsp;</span>
						<p>Copy</p>
					</div>

					{wasCopied && <div className={styles.container__copyFeedback}>Copied</div>}
				</>
			)}
		</div>
	);
}
