import Head from "next/head";

import ChangePassword from "@modules/changePassword/changePassword.module";

export default function ChangePasswordPage() {
	return (
		<>
			<Head>
				<title>Change password | keystone</title>
			</Head>

			<ChangePassword />
		</>
	);
}
