import Wrapper from "./layout/Wrapper"
import * as styles from "../styles/Header.module.css"
import Link from "next/link"
import { useContext, React } from "react"
import LoginContext from "../store/LoginCtx"
import { useRouter } from "next/router"

const Header = () => {
	const loginContext = useContext(LoginContext)
	const router = useRouter()
	const logoutHandler = () => {
		loginContext.dispatch({
			type: "LOGOUT",
		})
		router.push("/")
	}

	return (
		<header className={styles.header}>
			<Wrapper>
				<div className="wrap">
					<Link className="logo" href={"/"}>
						<div>BoJeArt</div>
					</Link>
					<nav>
						<ul className="wrap">
							<li>O nama</li>
							<li>Kontakt</li>
							<li>
								<button
									onClick={logoutHandler}
									className="button"
								>
									Одјави се
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
