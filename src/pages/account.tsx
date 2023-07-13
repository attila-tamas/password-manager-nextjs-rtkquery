// next
import Head from "next/head";
// @modules
import { Account } from "@modules/index";
// @components
import { Layout } from "@components/index";

export default function AccountPage() {
	return (
		<>
			<Head>
				<title>Account | keystone</title>
				<meta
					name="description"
					content="Manage your keystone account"
				/>
			</Head>

			{/* navigation bar and container for in-app pages */}
			<Layout>
				<Account />
			</Layout>
		</>
	);
}
