import React from "react";
import Image from "next/image";
import favicon from "@/../public/favicon.svg";
import styles from "./logo.module.scss";

export default function Logo({ width }: any) {
	if (!width) {
		width = 175;
	}

	return (
		<div
			className={`unselectable ${styles.container}`}
			style={{ width: `${width}px`, fontSize: width / 12 }}>
			<Image className={styles.container__img} src={favicon} alt="keystone container" />
			<span className={styles.container__text}>
				<span className={styles.container__text__highlight}>key</span>
				stone
			</span>
		</div>
	);
}
