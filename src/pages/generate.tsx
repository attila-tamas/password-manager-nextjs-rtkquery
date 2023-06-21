import Head from "next/head";

import Layout from "@components/layout/layout.component";
import Generate from "@modules/passwordGenerator/passwordGenerator.module";

export default function GeneratePage() {
	return (
		<>
			<Head>
				<title>Password generator | keystone</title>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<Generate />
			</Layout>
		</>
	);
}
