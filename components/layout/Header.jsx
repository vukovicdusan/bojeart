import { useContext, React, useState, useEffect } from "react"
import Wrapper from "./Wrapper"
import * as styles from "../../styles/Header.module.css"
import Link from "next/link"
import LoginContext from "../../store/LoginCtx"
import Router, { useRouter } from "next/router"
import { auth } from "../../public/firebase/firebase"
import { signOut } from "firebase/auth"
import ChevronDown from "../svg/ChevronDown"
import ClientOnly from "../ClientOnly"
import MobileMenu from "../MobileMenu"
import Loader from "../Loader"

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [animate, setAnimate] = useState(false)
	const loginContext = useContext(LoginContext)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		menuOpen
			? (document.body.style.overflow = "hidden") &&
			  setTimeout(() => {
					setAnimate(true)
			  }, 200)
			: (document.body.style.overflow = "auto") &&
			  setTimeout(() => {
					setAnimate(false)
			  }, 400)
	}, [menuOpen])

	useEffect(() => {
		Router.events.on("routeChangeStart", () => setLoading(true))
		Router.events.on("routeChangeComplete", () => setLoading(false))
		Router.events.on("routeChangeError", () => setLoading(false))
		return () => {
			Router.events.off("routeChangeStart", () => setLoading(true))
			Router.events.off("routeChangeComplete", () => setLoading(false))
			Router.events.off("routeChangeError", () => setLoading(false))
		}
	}, [Router.events])

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

	const menuOpenHandler = (e) => {
		menuOpen ? setMenuOpen(false) : setMenuOpen(true)
	}

	const menuCloseHandler = (e) => {
		setMenuOpen(false)
	}

	const author = loginContext.user === "jelena@gmail.com" ? "jelena" : "bojan"
	console.log(loading)
	return (
		<div>
			{loading ? (
				<div className="full-loader">
					<Loader></Loader>
				</div>
			) : null}
			{animate ? (
				<MobileMenu
					isOpen={menuOpen}
					user={loginContext.user}
					close={menuCloseHandler}
				></MobileMenu>
			) : (
				""
			)}
			<header className={styles.header}>
				<Wrapper>
					<div className="wrap">
						<Link className="logo" href={"/"}>
							BoJe<span className="main-color">Art</span>
						</Link>
						<nav className={styles.desktopNav}>
							<ul className="wrap">
								<li>
									<Link
										className={styles.navbarLink}
										href={"/"}
									>
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
															onClick={
																logoutHandler
															}
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
						<button
							onClick={menuOpenHandler}
							className={`${styles.hamburger} [ button-ghost ]`}
							aria-label="open menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="hamburger-svg"
								style={{
									transition: "all .4s ease-in-out",
									width: 32 + "px",
									height: 32 + "px",
									transform: menuOpen
										? "rotate(225deg)"
										: "rotate(0deg)",
								}}
							>
								<line
									id="top-line"
									x1="4.8"
									y1="9.6"
									x2="27.2"
									y2="9.6"
									stroke="var(--text-primary)"
									strokeWidth="3"
									strokeLinecap="round"
									style={{
										transition: "all .4s ease-in-out",

										transform: menuOpen
											? "rotate(-90deg) translate(-29px, 7px)"
											: "rotate(0deg)",
									}}
								></line>

								<line
									id="bottom-line"
									x1="27.2"
									y1="22.4"
									x2="4.8"
									y2="22.4"
									stroke="var(--text-primary)"
									strokeWidth="3"
									strokeLinecap="round"
									style={{
										transition: "all .4s ease-in-out",

										transform: menuOpen
											? "rotate(0deg) translate(0,-9px)"
											: "rotate(0deg)",
									}}
								></line>
							</svg>
						</button>
					</div>
				</Wrapper>
			</header>
		</div>
	)
}

export default Header
