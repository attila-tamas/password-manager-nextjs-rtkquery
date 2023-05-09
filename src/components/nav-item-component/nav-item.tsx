import styles from "./nav-item.module.scss";

export default function NavItem({ children, text }: any) {
	return (
		<div className={styles.container}>
			{children}
			<span className={styles.container__text}>{text}</span>
		</div>
	);
}
