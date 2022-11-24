import "../styles/globals.css"
import Layout from "../components/layout/Layout"
import { LoginContextProvider } from "../store/LoginCtx"

function MyApp({ Component, pageProps }) {
	return (
		<LoginContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</LoginContextProvider>
	)
}

export default MyApp
