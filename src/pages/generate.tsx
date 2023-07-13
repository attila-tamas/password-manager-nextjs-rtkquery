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
				<title>Generate password | keystone</title>
				<meta
					name="description"
					content="Generate strong passwords with a click of a button"
				/>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<GeneratePassword />
			</Layout>
		</>
	);
}
