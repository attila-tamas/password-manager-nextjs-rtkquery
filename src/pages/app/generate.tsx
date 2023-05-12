import Head from "next/head";

import Layout from "@modules/layout/layout";
import Generate from "@/modules/generate-page/generator";

export default function GeneratePage() {
	return (
		<>
			<Head>
				<title>Password generator | keystone</title>
			</Head>

			<Layout>
				<Generate />
			</Layout>
		</>
	);
}
