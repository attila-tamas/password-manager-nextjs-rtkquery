import Head from "next/head";
import Home from "@/components/home-page-component/home";

export default function Index() {
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
