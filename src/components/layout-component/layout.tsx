// styles
import styles from "./layout.module.scss";
// @util
import PersistLogin from "@util/persistLogin";
// @components
import Nav from "@components/nav-component/nav";

// used on pages that require a user to be logged in
export default function Layout({ children }: any) {
	return (
		// wrap the pages that are wrapped in the layout in a persist login component
		// to keep the user logged in on page reload
		<PersistLogin>
			{/* set the base container for the child components and add a navigation bar */}
			<div className={styles.container}>
				<Nav />
				{children}
			</div>
		</PersistLogin>
	);
}
