import Head from "next/head";

import ChangePassword from "@modules/change-password-page/change-password.module";

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
