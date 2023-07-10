// next
import Head from "next/head";
// @modules
import { RequestPasswordChange } from "@modules/index";

export default function RequestPasswordChangePage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<RequestPasswordChange />
		</>
	);
}
