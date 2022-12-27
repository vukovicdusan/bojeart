import React, { useEffect, useState } from "react"
import ClientOnly from "./ClientOnly"
import * as styles from "../styles/MobileMenu.module.css"
import Link from "next/link"
const MobileMenu = (props) => {
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		props.isOpen
			? setTimeout(() => {
					setAnimate(true)
			  }, 200)
			: setTimeout(() => {
					setAnimate(false)
			  }, 200)
	}, [props.isOpen])

	return (
		<div
			className={`${styles.mobileMenu} ${
				animate ? styles.mobileMenuOpen : ""
			}`}
		>
			<nav className={`${styles.mobileNav} [ stack ]`}>
				<ul className="stack">
					<li>
						<Link className="" href={"/"}>
							Slike
						</Link>
					</li>
					<li>
						<Link className="" href={"/about"}>
							O nama
						</Link>
					</li>
					<li>
						<Link className="" href={"/contact"}>
							Kontakt
						</Link>
					</li>
					<li>
						<ClientOnly>
							{/* {loginContext.user && (
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
							)} */}
						</ClientOnly>
					</li>
				</ul>
			</nav>
			<div className={`${styles.mobileNavSocials} [ wrap ]`}>
				<div className="logo" href={"/"}>
					BoJe<span className="main-color">Art</span>
				</div>
				<ul className="wrap">
					<li>
						<a href="www.google.com">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M8.923 12c0-1.699 1.377-3.076 3.077-3.076s3.078 1.376 3.078 3.076-1.379 3.077-3.078 3.077-3.077-1.378-3.077-3.077zm7.946-.686c.033.225.054.453.054.686 0 2.72-2.204 4.923-4.922 4.923s-4.923-2.204-4.923-4.923c0-.233.021-.461.054-.686.031-.221.075-.437.134-.647h-1.266v6.719c0 .339.275.614.616.614h10.769c.34 0 .615-.275.615-.615v-6.719h-1.265c.058.211.102.427.134.648zm.515-5.314h-1.449c-.341 0-.615.275-.615.615v1.45c0 .34.274.616.615.616h1.449c.34 0 .616-.276.616-.616v-1.45c0-.34-.275-.615-.616-.615zm6.616-1v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 .846c0-1.019-.826-1.846-1.846-1.846h-12.308c-1.019 0-1.846.827-1.846 1.846v12.307c0 1.02.827 1.847 1.846 1.847h12.309c1.019 0 1.845-.827 1.845-1.847v-12.307z" />
							</svg>
						</a>
					</li>
					<li>
						<a href="www.google.com">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
							</svg>
						</a>
					</li>
					<li>
						<a href="www.google.com">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MobileMenu
