import Head from "next/head";

import VerifyEmail from "@/modules/verify-email-page/verify-email.module";

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
