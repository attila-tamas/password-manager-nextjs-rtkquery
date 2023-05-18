import Head from "next/head";

import Login from "@modules/login-page/login.module";

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Sign in | keystone</title>
			</Head>

			<Login />
		</>
	);
}
