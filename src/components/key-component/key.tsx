import styles from "./key.module.scss";

import { selectKeyById } from "@redux/keys/keysApiSlice";
import { useSelector } from "react-redux";

import OptionsIcon from "@components/icon-components/options-icon";
import WebsiteIcon from "@components/website-icon-component/website-icon";
import { useState } from "react";

export default function Key(props: any) {
	const key = useSelector(state => selectKeyById(state, props.keyId));

	const [text, setText] = useState("Copy password");
	const [waitTimer, setWaitTimer] = useState(undefined);

	const credentialField = key?.customFields.find((field: any) => {
		const fieldInLowerCase = field.key.toLowerCase();
		const foundField =
			fieldInLowerCase.includes("email") || fieldInLowerCase.includes("username");

		if (foundField) {
			return foundField;
		}
	});
	const credential = credentialField?.value;

	const copyPassword = () => {
		if (!waitTimer) {
			navigator.clipboard.writeText(key.password);

			setText("Password copied");

			setWaitTimer(
				setTimeout(() => {
					setText("Copy password");
					setWaitTimer(undefined);
				}, 600) as any
			);
		}
	};

	if (key) {
		return (
			<div className={styles.container}>
				<div className={styles.container__content}>
					<WebsiteIcon currentKey={key} grow />

					<div className={styles.container__content__text}>
						<p className={styles.container__content__text__title}>{key.title}</p>
						<p className={styles.container__content__text__description}>{credential}</p>
						<p
							className={`link ${styles.container__content__text__action}`}
							onClick={copyPassword}>
							{text}
						</p>
					</div>
				</div>

				<div className={styles.container__options} onClick={props.onClick}>
					<OptionsIcon size="24" />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
