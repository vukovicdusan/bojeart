import React from "react"
import Wrapper from "./layout/Wrapper"
import * as styles from "../styles/Header.module.css"
import Link from "next/link"

const Header = () => {
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
						</ul>
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
