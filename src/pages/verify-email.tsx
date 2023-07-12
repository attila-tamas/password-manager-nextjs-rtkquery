// next
import Head from "next/head";
// @modules
import { VerifyEmail } from "@modules/index";
// @components
import { PersistLogin } from "@components/index";
import RouteGuard from "@components/routeGuard/routeGuard";

export default function VerifyEmailPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<PersistLogin>
				<RouteGuard>
					<VerifyEmail />
				</RouteGuard>
			</PersistLogin>
		</>
	);
}
