import styles from "./key.module.scss";

import Image from "next/image";

import OptionsIcon from "@components/icon-components/options-icon";
import OpenIcon from "@components/icon-components/open-icon";

export default function key({ props }: any) {
	const copyPassword = () => {
		navigator.clipboard.writeText(props.password);
		console.log(`password copied: ${props.password}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__content}>
				<a
					className={styles.container__content__imageContainer}
					href={`https://www.${props.websiteUrl}`}
					target="_blank"
					rel="noopener noreferrer">
					<Image
						className={`unselectable ${styles.container__content__imageContainer__image}`}
						src={`https://icon.horse/icon/${props.websiteUrl}`}
						alt={`${props.title} icon`}
						fill
						sizes="2.875rem, (min-width: 40rem) 4.5rem"
					/>
					<div className={styles.container__content__imageContainer__openIcon}>
						<OpenIcon size="16" />
					</div>
				</a>

				<div className={styles.container__content__text}>
					<p className={styles.container__content__text__title}>{props.title}</p>
					<p className={styles.container__content__text__description}>{props.email}</p>
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
}
