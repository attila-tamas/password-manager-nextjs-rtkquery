import styles from "./websiteIcon.module.scss";
// react
import { useEffect, useState } from "react";
// next.js
import Image from "next/image";
// @hooks
import { useFindCustomField } from "@hooks/index";
// @public
import warningIcon from "@public/warningIcon.svg";
// @components
import { EntryType } from "@components/entry/entry.component";
import { Icon, icons } from "@components/index";
// @util
import { pixelToEm } from "@util/index";

export default function WebsiteIcon({ entry }: { entry: EntryType }) {
	const [icon, setIcon] = useState("");
	const [error, setError] = useState({ message: "", hint: "" });

	const urlField = useFindCustomField(entry, ["website", "url"]);
	let url = urlField.value;

	if (url) {
		// "http" urls are not accepted, becase of the URL constructor
		if (url.indexOf("https://") === -1) url = "https://" + url;
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
					setError({
						message: "Invalid URL",
						hint: "Check for typos",
					});
				}
			} catch (error) {
				setError({ message: "Invalid URL", hint: "Check for typos" });
			}

			// store the icon url in a state so it changes when the website url changes as well
			setIcon(`https://icon.horse/icon/${domain}`);
		} else {
			setError({
				message: "Missing URL",
				hint: "Add a custom URL field",
			});
		}
	}, [url]);

	if (!error.message && url) {
		return (
			// display the website icon if there is a valid url and there is no error

			<a
				className={styles["website-icon"]}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					className={`unselectable ${styles["image"]}`}
					src={icon || warningIcon}
					alt={`${entry.title} icon`}
					fill
					sizes="(max-width: 40rem) 2.875rem, 4.75rem"
				/>

				<div className={styles["open-icon"]}>
					<Icon icon={icons.open} size={pixelToEm(16)} />
				</div>
			</a>
		);
	} else {
		return (
			// display a warning icon and an error tooltip on hover if there is an error

			<div className={styles["warning"]}>
				<Image
					className={`unselectable ${styles["image"]}`}
					src={warningIcon}
					alt="warning icon"
					fill
					sizes="(max-width: 40rem) 2.875rem, 4.75rem"
				/>

				<span className={styles["tooltip"]}>
					{error.message}
					<br />
					<span className={styles["tooltip__hint"]}>
						{error.hint}
					</span>
				</span>
			</div>
		);
	}
}
