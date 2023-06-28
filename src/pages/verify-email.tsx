import Head from "next/head";

import VerifyEmail from "@modules/verifyEmail/verifyEmail.module";
import PersistLogin from "@util/persistLogin";

export default function VerifyEmailPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<PersistLogin>
				<VerifyEmail />
			</PersistLogin>
		</>
	);
}
