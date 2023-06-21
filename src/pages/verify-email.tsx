import Head from "next/head";

import VerifyEmail from "@modules/verifyEmail/verifyEmail.module";

export default function VerifyEmailPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<VerifyEmail />
		</>
	);
}
