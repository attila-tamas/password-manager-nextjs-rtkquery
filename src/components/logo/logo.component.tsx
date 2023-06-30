// styles
import styles from "./logo.module.scss";
// next.js
import Image from "next/image";
// @public
import favicon from "@public/favicon.svg";

export default function Logo({
	size = "1.25rem",
	className,
}: {
	size?: string;
	className?: string;
}) {
	return (
		<div
			className={`unselectable ${styles["logo"]} ${className}`}
			style={{ fontSize: size }}
		>
			<Image
				src={favicon}
				alt="keystone container"
				style={{ minWidth: size, minHeight: size }}
			/>

			<span className={styles["logo__text"]}>
				<span className={styles["logo__text__highlight"]}>key</span>
				stone
			</span>
		</div>
	);
}
