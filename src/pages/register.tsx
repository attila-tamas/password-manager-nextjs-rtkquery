// next
import Head from "next/head";
// @modules
import RouteGuard from "@components/routeGuard/routeGuard";
import { Registration } from "@modules/index";

export default function RegisterPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
				<meta name="description" content="Create a keystone account" />
			</Head>

			<RouteGuard>
				<Registration />
			</RouteGuard>
		</>
	);
}
