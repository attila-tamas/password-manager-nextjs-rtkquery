import styles from "./website-icon.module.scss";

import Image from "next/image";

import OpenIcon from "@components/icon-components/open-icon";

export default function WebsiteIcon({ currentKey, grow }: any) {
	const urlField = currentKey.customFields.find((field: any) => {
		const fieldInLowerCase = field.key.toLowerCase();
		const foundField = fieldInLowerCase.includes("url") || fieldInLowerCase.includes("website");

		if (foundField) {
			return foundField;
		}
	});
	const url = urlField?.value;

	return (
		<a
			className={`${styles.container} ${grow && styles.container__grow}`}
			href={`https://www.${url}`}
			target="_blank"
			rel="noopener noreferrer">
			<Image
				className={`unselectable ${styles.container__image}`}
				src={`https://icon.horse/icon/${url}`}
				alt={`${currentKey.title} icon`}
				fill
				sizes="(max-width: 40rem) 2.875rem, 4.75rem"
			/>
			<div className={styles.container__openIcon}>
				<OpenIcon size="16" />
			</div>
		</a>
	);
}
