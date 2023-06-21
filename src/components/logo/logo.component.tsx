// styles
import styles from "./logo.module.scss";
// next.js
import Image from "next/image";
// @public
import favicon from "@public/favicon.svg";

export default function Logo({ size }: any) {
	// if a size is not given to the component it will default to 175px for easier use
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
