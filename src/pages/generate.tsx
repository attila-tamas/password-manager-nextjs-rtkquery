// next
import Head from "next/head";
// &components
import { Layout } from "@components/index";
// modules
import { GeneratePassword } from "@modules/index";

export default function GeneratePage() {
	return (
		<>
			<Head>
				<title>Password generator | keystone</title>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<GeneratePassword />
			</Layout>
		</>
	);
}
