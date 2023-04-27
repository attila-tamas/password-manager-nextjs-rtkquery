import React from "react";
import Image from "next/image";
import favicon from "@/../public/favicon.svg";
import styles from "./logo.module.scss";

export default function Logo({ width }: any) {
	return (
		<div className={styles.logo} style={{ width: `${width}px`, fontSize: width / 12 }}>
			<Image className={styles.logo__img} src={favicon} alt="keystone Logo" />
			<span className={styles.logo__text}>
				<span className={styles.logo__text__highlight}>key</span>
				stone
			</span>
		</div>
	);
}
