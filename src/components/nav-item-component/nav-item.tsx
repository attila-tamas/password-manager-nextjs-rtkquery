import Link from "next/link";

import styles from "./nav-item.module.scss";

export default function NavItem({ children, text, to, onClick }: any) {
	return (
		<Link href={to} onClick={onClick} className={styles.container}>
			{children}
			<span className={styles.container__text}>{text}</span>
		</Link>
	);
}
