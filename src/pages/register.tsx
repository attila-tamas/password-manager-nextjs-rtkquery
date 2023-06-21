import Head from "next/head";

import Registration from "@modules/registration/registration.module";

export default function RegisterPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<Registration />
		</>
	);
}
