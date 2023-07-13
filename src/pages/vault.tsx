// next
import Head from "next/head";
// @components
import { Layout } from "@components/index";
// @modules
import { Vault } from "@modules/index";

export default function VaultPage() {
	return (
		<>
			<Head>
				<title>Vault | keystone</title>
				<meta name="description" content="Manage your passwords" />
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<Vault />
			</Layout>
		</>
	);
}
