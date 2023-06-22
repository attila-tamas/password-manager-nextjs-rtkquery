// styles
import styles from "./key.module.scss";
// react
import { useState } from "react";
// npm
import { useSelector } from "react-redux";
// @redux
import { selectKeyById } from "@redux/keys/keysApiSlice";
// @components
import Icon, { icons } from "@components/icon/icon";
import WebsiteIcon from "@components/websiteIcon/websiteIcon";
// @util
import pixelToRem from "@util/pixelToRem";

export default function Key({ keyId, active, onClick }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

	// states
	const [text, setText] = useState("Copy password");
	const [waitTimer, setWaitTimer] = useState(undefined);
	//

	// get the email, or the username if the email does not exist
	const credentialField = key?.customFields.find((field: any) => {
		const fieldInLowerCase = field.key.toLowerCase();
		const foundField =
			fieldInLowerCase.includes("email") || fieldInLowerCase.includes("username");

		if (foundField) {
			return foundField;
		}
	});
	const credential = credentialField?.value;
	//

	// copy button handler
	const onCopyButtonClicked = () => {
		if (!waitTimer) {
			navigator.clipboard.writeText(key.password);

			// change the button text on a successful copy to give feedback to the user
			setText("Password copied");

			// reset the text after a 600ms delay
			setWaitTimer(
				setTimeout(() => {
					setText("Copy password");
					setWaitTimer(undefined);
				}, 600) as any
			);
		}
	};

	// only return content when a key was found by the given id
	if (key) {
		return (
			<div className={`${styles.container} ${active && styles.active}`}>
				{/* main content of the key starts */}
				<div className={styles.content}>
					<WebsiteIcon currentKey={key} grow />

					{/* text content of the key starts */}
					<div className={styles.content__textContainer}>
						<p className={styles.content__textContainer__title}>{key.title}</p>

						<p className={styles.content__textContainer__description}>{credential}</p>

						<p
							onClick={onCopyButtonClicked}
							className={`interactable ${styles.content__textContainer__actionBtn}`}>
							{text}
						</p>
					</div>
					{/* text content of the key ends */}
				</div>
				{/* main content of the key ends */}

				<div onClick={onClick} className={styles.optionsIcon}>
					<Icon icon={icons.options} size={pixelToRem(24)} />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
