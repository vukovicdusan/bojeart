import "../styles/globals.css"
import Layout from "../components/layout/Layout"
import { LoginContextProvider } from "../store/LoginCtx"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/amaticsc-bold-webfont.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/amaticsc-regular-webfont.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/comforter-regular-webfont.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</Head>
			<LoginContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</LoginContextProvider>
		</>
	)
}

export default MyApp
