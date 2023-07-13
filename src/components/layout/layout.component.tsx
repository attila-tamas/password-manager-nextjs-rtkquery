import styles from "./layout.module.scss";
// react
import { ReactNode } from "react";
// @components
import { Navbar, PersistLogin } from "@components/index";
import RouteGuard from "@components/routeGuard/routeGuard";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<PersistLogin>
			<RouteGuard>
				<div className={styles["layout"]}>
					<Navbar />
					{children}
				</div>
			</RouteGuard>
		</PersistLogin>
	);
}
