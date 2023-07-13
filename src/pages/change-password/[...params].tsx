// next
import Head from "next/head";
// @modules
import { ChangePassword } from "@modules/index";

export default function ChangePasswordPage() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<ChangePassword />
		</>
	);
}
