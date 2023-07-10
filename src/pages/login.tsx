// next
import Head from "next/head";
// @modules
import { Login } from "@modules/index";

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
