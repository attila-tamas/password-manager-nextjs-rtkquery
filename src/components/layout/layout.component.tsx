import styles from "./layout.module.scss";
// react
import { ReactNode } from "react";
// @components
import { Navbar, PersistLogin } from "@components/index";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<PersistLogin>
			<div className={styles["layout"]}>
				<Navbar />
				{children}
			</div>
		</PersistLogin>
	);
}
