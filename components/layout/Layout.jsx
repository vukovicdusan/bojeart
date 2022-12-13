import Header from "../Header"
import Footer from "../Footer"
import Wrapper from "../layout/Wrapper"
import * as styles from "../../styles/Layout.module.css"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
	const router = useRouter().asPath
	return (
		<div
			className={router === "/" ? styles.layoutBackground : styles.layout}
		>
			<div>
				<Header></Header>
				<main>
					<Wrapper>{children}</Wrapper>
				</main>
			</div>
			<Footer></Footer>
		</div>
	)
}

export default Layout
