import Header from "../Header"
import Footer from "../Footer"
import Wrapper from "../layout/Wrapper"

const Layout = ({ children }) => {
	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>{children}</Wrapper>
			</main>
			<Footer></Footer>
		</>
	)
}

export default Layout
