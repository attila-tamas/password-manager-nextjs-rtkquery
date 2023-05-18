import styles from "./key.module.scss";

import Image from "next/image";

import { useSelector } from "react-redux";
import { selectKeyById } from "@redux/keys/keysApiSlice";

import OptionsIcon from "@components/icon-components/options-icon";
import OpenIcon from "@components/icon-components/open-icon";

export default function Key(props: any) {
	const key = useSelector(state => selectKeyById(state, props.keyId));

	const copyPassword = () => {
		navigator.clipboard.writeText(key.password);
		console.log(`password copied: ${key.password}`);
	};

	if (key) {
		return (
			<div className={styles.container}>
				<div className={styles.container__content}>
					<a
						className={styles.container__content__imageContainer}
						href={`https://www.${key.websiteUrl}`}
						target="_blank"
						rel="noopener noreferrer">
						<Image
							className={`unselectable ${styles.container__content__imageContainer__image}`}
							src={`https://icon.horse/icon/${key.websiteUrl}`}
							alt={`${key.title} icon`}
							fill
							sizes="(max-width: 40rem) 2.875rem, 4.75rem"
						/>
						<div className={styles.container__content__imageContainer__openIcon}>
							<OpenIcon size="16" />
						</div>
					</a>

					<div className={styles.container__content__text}>
						<p className={styles.container__content__text__title}>{key.title}</p>
						<p className={styles.container__content__text__description}>{key.email}</p>
						<p
							className={`link ${styles.container__content__text__action}`}
							onClick={copyPassword}>
							Copy password
						</p>
					</div>
				</div>

				<div className={styles.container__options}>
					<OptionsIcon size="24" />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
