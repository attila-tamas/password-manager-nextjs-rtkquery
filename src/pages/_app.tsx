// styles
import "@styles/globals.scss";
// next.js
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";
import Head from "next/head";
// npm
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// @redux
import { wrapper } from "@redux/store";
// @components
import SnackbarContext from "@components/snackbar-components/snackbar-context";

// create the font for next/font
const quicksand = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	// wrap the redux store
	const { store } = wrapper.useWrappedStore(pageProps);
	// create a persistor for the PersistGate
	const persistor = persistStore(store);

	return (
		<>
			<Head>
				{/* responsive design support */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* set the favicon */}
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>

			{/* Set the default font for the application */}
			<style jsx global>{`
				html {
					font-family: ${quicksand.style.fontFamily};
				}
			`}</style>

			{/* provider for the redux store */}
			<Provider store={store}>
				{/* redux-persist gate, that only allows the data to load when the persisted states are rehydrated */}
				<PersistGate persistor={persistor} loading={null}>
					{/* provide access to the snackbar hook context */}
					<SnackbarContext>
						{/* render the child components */}
						<Component {...pageProps} />
					</SnackbarContext>
				</PersistGate>
			</Provider>
		</>
	);
}
