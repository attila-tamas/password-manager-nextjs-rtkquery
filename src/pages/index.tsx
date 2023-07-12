// next
import Head from "next/head";
// @modules
import RouteGuard from "@components/routeGuard/routeGuard";
import { Home } from "@modules/index";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Password Manager | keystone</title>
				<meta
					name="description"
					content="Easy Password Management To Simplify Your Life"
				/>
			</Head>

			<RouteGuard>
				<Home />
			</RouteGuard>
		</>
	);
}
