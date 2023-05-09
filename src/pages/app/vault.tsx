import Head from "next/head";

import Layout from "@modules/layout/layout";
import Vault from "@modules/vault-page/vault.module";

export default function VaultPage() {
	return (
		<>
			<Head>
				<title>Vault | keystone</title>
			</Head>

			<Layout>
				<Vault />
			</Layout>
		</>
	);
}
