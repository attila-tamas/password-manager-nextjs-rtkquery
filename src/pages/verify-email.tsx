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
				<title>Verify email | keystone</title>
				<meta
					name="description"
					content="Verify your email address to active your account"
				/>
			</Head>

			<PersistLogin>
				<RouteGuard>
					<VerifyEmail />
				</RouteGuard>
			</PersistLogin>
		</>
	);
}
