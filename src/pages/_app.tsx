import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>

			{/* Set the default font for the application */}
			<style jsx global>{`
				html {
					font-family: ${quicksand.style.fontFamily};
				}
			`}</style>

			<Component {...pageProps} />
		</>
	);
}
