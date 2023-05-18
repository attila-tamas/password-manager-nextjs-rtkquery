import Head from "next/head";

import Register from "@modules/register-page/register.module";

export default function RegisterPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<Register />
		</>
	);
}
