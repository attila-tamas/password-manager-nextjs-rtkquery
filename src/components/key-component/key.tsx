import styles from "./key.module.scss";

import { selectKeyById } from "@redux/keys/keysApiSlice";
import { useSelector } from "react-redux";

import OptionsIcon from "@components/icon-components/options-icon";
import WebsiteIcon from "@components/website-icon-component/website-icon";
import { useState } from "react";

export default function Key({ keyId, onClick }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

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
				<div className={styles.content}>
					<WebsiteIcon currentKey={key} grow />

					<div className={styles.content__textContainer}>
						<p className={styles.content__textContainer__title}>{key.title}</p>
						<p className={styles.content__textContainer__description}>{credential}</p>
						<p
							onClick={copyPassword}
							className={`link ${styles.content__textContainer__actionBtn}`}>
							{text}
						</p>
					</div>
				</div>

				<div onClick={onClick} className={styles.optionsIcon}>
					<OptionsIcon size="24" />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
