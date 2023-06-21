import Head from "next/head";

import Layout from "@components/layout/layout.component";
import Vault from "@modules/vault/vault.module";

export default function VaultPage() {
	return (
		<>
			<Head>
				<title>Vault | keystone</title>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<Vault />
			</Layout>
		</>
	);
}
