import Head from "next/head";

import Layout from "@components/layout-component/layout";
import Generate from "@modules/generate-password-page/password-generator.module";

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
