import Head from "next/head";

import ActivateAccount from "@modules/activate-account-page/activate-account.module";

export default function ActivateAccountPage() {
	return (
		<>
			<Head>
				<title>Activate account | keystone</title>
			</Head>

			<ActivateAccount />
		</>
	);
}
