import Link from "next/link";

import styles from "./nav-item.module.scss";

export default function NavItem({ children, text, to }: any) {
	return (
		<Link href={`${to}`} className={styles.container}>
			{children}
			<span className={styles.container__text}>{text}</span>
		</Link>
	);
}
