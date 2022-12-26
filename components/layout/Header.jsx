import { useContext, React } from "react"
import Wrapper from "./Wrapper"
import * as styles from "../../styles/Header.module.css"
import Link from "next/link"
import LoginContext from "../../store/LoginCtx"
import { useRouter } from "next/router"
import { auth } from "../../public/firebase/firebase"
import { signOut } from "firebase/auth"
import ChevronDown from "../svg/ChevronDown"
import ClientOnly from "../ClientOnly"

const Header = () => {
	const loginContext = useContext(LoginContext)
	const router = useRouter()
	const logoutHandler = () => {
		router.push("/")
		setTimeout(() => {
			signOut(auth)
				.then(() => {})
				.catch((error) => {
					console.log(error)
				})
		}, 500)
	}

	const author = loginContext.user === "jelena@gmail.com" ? "jelena" : "bojan"

	return (
		<header className={styles.header}>
			<Wrapper>
				<div className="wrap">
					<Link className="logo" href={"/"}>
						BoJe<span className="main-color">Art</span>
					</Link>
					<nav>
						<ul className="wrap">
							<li>
								<Link className={styles.navbarLink} href={"/"}>
									Slike
								</Link>
							</li>
							<li>
								<Link
									className={styles.navbarLink}
									href={"/about"}
								>
									O nama
								</Link>
							</li>
							<li>
								<Link
									className={styles.navbarLink}
									href={"/contact"}
								>
									Kontakt
								</Link>
							</li>
							<li>
								<ClientOnly>
									{loginContext.user && (
										<div className="dropdown-toggle">
											<span className="[ with-icon ] [ bold ]">
												<ChevronDown className="icon"></ChevronDown>
												{author}
											</span>
											<ul className="[ dropdown-menu ] [ stack ] [ box ]">
												<li>
													<Link href={"/autor"}>
														Radionica
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
								</ClientOnly>
							</li>
						</ul>
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
