import styles from "./website-icon.module.scss";

import { useEffect, useState } from "react";

import warningIcon from "@public/warning-icon.svg";
import Image from "next/image";

import OpenIcon from "@components/icon-components/open-icon";

export default function WebsiteIcon({ currentKey, grow }: any) {
	const [icon, setIcon] = useState("");
	const [error, setError] = useState({ message: "", hint: "" });

	const urlField = currentKey.customFields.find((field: any) => {
		const fieldInLowerCase = field.key.toLowerCase();
		const foundField = fieldInLowerCase.includes("url") || fieldInLowerCase.includes("website");

		if (foundField) {
			return foundField;
		}
	});

	let url = urlField?.value;

	// add "https://" at the start of the url to decrease user error
	if (url && url.indexOf("https://") === -1) {
		url = "https://" + url;
	}

	const isValidUrl = (urlString: string) => {
		const urlPattern = new RegExp(
			"^(https?:\\/\\/)?" + // validate protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
				"(\\#[-a-z\\d_]*)?$", // validate fragment locator
			"i"
		);
		return !!urlPattern.test(urlString);
	};

	useEffect(() => {
		setError({ message: "", hint: "" });

		if (url) {
			let domain = url;

			// use a trycatch to catch the URL constructor's error
			try {
				domain = new URL(url).hostname.replace("www.", "");

				// edge case error
				if (!isValidUrl(url)) {
					setError({ message: "Invalid URL", hint: "Check for typos" });
				}
			} catch (error) {
				setError({ message: "Invalid URL", hint: "Check for typos" });
			}

			setIcon(`https://icon.horse/icon/${domain}`);
		} else {
			setError({ message: "Missing URL", hint: "Add a custom URL field" });
		}
	}, [url]);

	return (
		<>
			{!error.message && url ? (
				<a
					className={`${styles.container} ${grow && styles.grow}`}
					href={url}
					target="_blank"
					rel="noopener noreferrer">
					<Image
						className={`unselectable ${styles.container__image}`}
						src={icon || warningIcon}
						alt={`${currentKey.title} icon`}
						fill
						sizes="(max-width: 40rem) 2.875rem, 4.75rem"
					/>

					<div className={styles.container__openIcon}>
						<OpenIcon size="16" />
					</div>
				</a>
			) : (
				<div className={`${styles.warning} ${grow && styles.grow}`}>
					<Image
						className={`unselectable ${styles.container__image}`}
						src={warningIcon}
						alt="warning icon"
						fill
						sizes="(max-width: 40rem) 2.875rem, 4.75rem"
					/>
					<span className={styles.warning__tooltip}>
						{error.message}
						<br />
						<span className={styles.warning__tooltip__hint}>{error.hint}</span>
					</span>
				</div>
			)}
		</>
	);
}
