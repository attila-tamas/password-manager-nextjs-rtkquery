import styles from "./layout.module.scss";

import Nav from "@components/nav-component/nav";
import PersistLogin from "@util/persistLogin";

export default function Layout({ children }: any) {
	return (
		<PersistLogin>
			<div className={styles.container}>
				<Nav />
				{children}
			</div>
		</PersistLogin>
	);
}
