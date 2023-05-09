import styles from "./layout.module.scss";

import Nav from "@components/nav-component/nav";

export default function Layout({ children }: any) {
	return (
		<div className={styles.container}>
			<Nav />
			{children}
		</div>
	);
}
