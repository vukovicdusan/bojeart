import Wrapper from "./layout/Wrapper"
import * as styles from "../styles/Header.module.css"
import Link from "next/link"
import { useContext, React } from "react"
import LoginContext from "../store/LoginCtx"
import { useRouter } from "next/router"
import { auth } from "../public/firebase/firebase"
import { signOut } from "firebase/auth"
import ChevronDown from "./ChevronDown"

const Header = () => {
	const loginContext = useContext(LoginContext)
	const router = useRouter()
	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				router.push("/")
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const author = loginContext.user === "jelena@gmail.com" ? "jelena" : "bojan"

	return (
		<header className={styles.header}>
			<Wrapper>
				<div className="wrap">
					<Link className="logo" href={"/"}>
						<div>
							BoJe<span className="main-color">Art</span>
						</div>
					</Link>
					<nav>
						<ul className="wrap">
							<li>
								<Link href={"/about"}>O nama</Link>
							</li>
							<li>
								<Link href={"/contact"}>Kontakt</Link>
							</li>
							<li>
								{loginContext.user && (
									<div className="dropdown-toggle">
										<span className="with-icon">
											<ChevronDown className="icon"></ChevronDown>
											{author}
										</span>
										<ul className="[ dropdown-menu ] [ stack ] [ box ]">
											<li>
												<Link href={"/autor"}>
													Postavi sliku
												</Link>
											</li>
											<li>
												<button
													onClick={logoutHandler}
													className="button"
												>
													Odjavi se
												</button>
											</li>
										</ul>
									</div>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
