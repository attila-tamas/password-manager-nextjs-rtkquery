// styles
import styles from "./websiteIcon.module.scss";
// react
import { useEffect, useState } from "react";
// next.js
import Image from "next/image";
// @public
import warningIcon from "@public/warning-icon.svg";
// @util
import pixelToRem from "@util/pixelToRem";
// @components
import Icon, { icons } from "@components/icon/icon";

export default function WebsiteIcon({ currentKey, grow }: any) {
	// states
	const [icon, setIcon] = useState("");
	const [error, setError] = useState({ message: "", hint: "" });
	//

	// get the website url of the given key
	const urlField = currentKey.customFields.find((field: any) => {
		const fieldInLowerCase = field.key.toLowerCase();
		const foundField = fieldInLowerCase.includes("url") || fieldInLowerCase.includes("website");

		if (foundField) {
			return foundField;
		}
	});
	let url = urlField?.value;
	//

	// add "https://" at the start of the url if it is not found
	// "http" urls are not accepted, becase of the URL constructor
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

			// store the icon url in a state so it changes when the website url changes as well
			setIcon(`https://icon.horse/icon/${domain}`);
		} else {
			setError({ message: "Missing URL", hint: "Add a custom URL field" });
		}
	}, [url]);

	return (
		<>
			{!error.message && url ? (
				// display the website icon if there is a valid url and there is no error

				<a
					className={`${styles.container} ${grow && styles.container__grow}`}
					href={url}
					target="_blank"
					rel="noopener noreferrer">
					<Image
						className={`unselectable ${styles.image}`}
						src={icon || warningIcon}
						alt={`${currentKey.title} icon`}
						fill
						sizes="(max-width: 40rem) 2.875rem, 4.75rem"
					/>

					<div className={styles.openIcon}>
						<Icon icon={icons.open} size={pixelToRem(16)} />
					</div>
				</a>
			) : (
				// display a warning icon and a tooltip on hover to display the error message if there is an error

				<div className={`${styles.warning} ${grow && styles.container__grow}`}>
					<Image
						className={`unselectable ${styles.image}`}
						src={warningIcon}
						alt="warning icon"
						fill
						sizes="(max-width: 40rem) 2.875rem, 4.75rem"
					/>

					<span className={styles.tooltip}>
						{error.message}
						<br />
						<span className={styles.tooltip__hint}>{error.hint}</span>
					</span>
				</div>
			)}
		</>
	);
}
