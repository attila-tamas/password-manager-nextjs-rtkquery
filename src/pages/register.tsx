// next
import Head from "next/head";
// @modules
import { Registration } from "@modules/index";

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
