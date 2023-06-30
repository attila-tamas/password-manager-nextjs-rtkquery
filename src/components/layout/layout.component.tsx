import styles from "./layout.module.scss";
// react
import { ReactNode } from "react";
// @components
import { Navbar } from "@components/index";
// @util
import PersistLogin from "@util/persistLogin";

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
