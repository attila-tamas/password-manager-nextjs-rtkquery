import Head from "next/head";

import Layout from "@components/layout/layout.component";
import Account from "@modules/account/account.module";

export default function AccountPage() {
	return (
		<>
			<Head>
				<title>Account | keystone</title>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<Account />
			</Layout>
		</>
	);
}
