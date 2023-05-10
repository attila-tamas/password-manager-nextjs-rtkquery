import Head from "next/head";

import Layout from "@modules/layout/layout";
import Account from "@modules/account-page/account";

export default function AccountPage() {
	return (
		<>
			<Head>
				<title>Account | keystone</title>
			</Head>

			<Layout>
				<Account />
			</Layout>
		</>
	);
}
