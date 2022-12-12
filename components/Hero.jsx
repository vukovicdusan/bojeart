import React from "react"
import Region from "./layout/Region"
import * as styles from "../styles/Hero.module.css"
import Splatter from "./Splatter"
const Hero = () => {
	return (
		<Region>
			<h1 className={styles.heroTitle}>
				BoJe<span className="main-color">Art</span>
			</h1>
			<Splatter className="[ splatter ] [ splatter1 ]"></Splatter>
		</Region>
	)
}

export default Hero
