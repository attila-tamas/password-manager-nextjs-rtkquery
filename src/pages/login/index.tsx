import Head from "next/head";
import Login from "@/components/login-page-component/login";

export default function Index() {
	return (
		<>
			<Head>
				<title>Sign in | keystone</title>
			</Head>

			<Login />
		</>
	);
}
