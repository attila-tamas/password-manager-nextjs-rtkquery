// styles
import styles from "./nav-item.module.scss";
//next.js
import Link from "next/link";

export default function NavItem({ children, text, to, onClick }: any) {
	return (
		<Link href={to} onClick={onClick} className={styles.container}>
			{children}
			<span className={styles.text}>{text}</span>
		</Link>
	);
}
