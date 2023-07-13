// next
import Head from "next/head";
// @modules
import RouteGuard from "@components/routeGuard/routeGuard";
import { Login } from "@modules/index";

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Sign in | keystone</title>
				<meta
					name="description"
					content="Sign in to your keystone account"
				/>
			</Head>

			<RouteGuard>
				<Login />
			</RouteGuard>
		</>
	);
}
