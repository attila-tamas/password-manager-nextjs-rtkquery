// next
import Head from "next/head";
// @modules
import { VerifyEmail } from "@modules/index";
// @util
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
