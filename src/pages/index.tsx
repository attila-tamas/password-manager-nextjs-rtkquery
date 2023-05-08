import Head from "next/head";
import Home from "@modules/home-page/home.module";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Password Manager | keystone</title>
				<meta name="description" content="Easy Password Management To Simplify Your Life" />
			</Head>

			<Home />
		</>
	);
}
