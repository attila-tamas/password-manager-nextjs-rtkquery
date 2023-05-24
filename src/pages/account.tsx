import Head from "next/head";

import Layout from "@components/layout-component/layout";
import Account from "@modules/account-page/account.module";

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
