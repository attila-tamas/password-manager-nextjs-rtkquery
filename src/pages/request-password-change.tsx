// next
import Head from "next/head";
// @modules
import { RequestPasswordChange } from "@modules/index";

export default function RequestPasswordChangePage() {
	return (
		<>
			<Head>
				<title>Request password change | keystone</title>
				<meta name="description" content="Request password change" />
			</Head>

			<RequestPasswordChange />
		</>
	);
}
