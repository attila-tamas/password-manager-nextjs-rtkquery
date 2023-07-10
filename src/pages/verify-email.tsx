// next
import Head from "next/head";
// @modules
import { VerifyEmail } from "@modules/index";
// @components
import { PersistLogin } from "@components/index";

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
