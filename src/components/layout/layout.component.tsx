// styles
import styles from "./layout.module.scss";
// @util
import PersistLogin from "@util/persistLogin";
// @components
import Nav from "@components/nav/nav.component";

// used on pages that require a user to be logged in
export default function Layout({ children }: any) {
	return (
		// keep the user logged in on page reload
		<PersistLogin>
			<div className={styles.container}>
				<Nav />
				{children}
			</div>
		</PersistLogin>
	);
}
