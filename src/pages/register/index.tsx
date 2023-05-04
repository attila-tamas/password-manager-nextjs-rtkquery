import Head from "next/head";
import Register from "@/components/register-page-component/register";

export default function Index() {
	return (
		<>
			<Head>
				<title>Create account | keystone</title>
			</Head>

			<Register />
		</>
	);
}
