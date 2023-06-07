import styles from "./logo.module.scss";

import Image from "next/image";

import favicon from "@public/favicon.svg";

export default function Logo({ size }: any) {
	if (!size) {
		size = 175;
	}

	return (
		<div
			className={`unselectable ${styles.container}`}
			style={{ width: `${size}px`, fontSize: size / 12 }}>
			<Image className={styles.img} src={favicon} alt="keystone container" />

			<span className={styles.text}>
				<span className={styles.text__highlight}>key</span>
				stone
			</span>
		</div>
	);
}
