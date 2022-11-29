import React from "react"
import Region from "./layout/Region"
import * as styles from "../styles/Hero.module.css"
const Hero = () => {
	return (
		<Region>
			<h1 className={styles.heroTitle}>
				БоЈе<span>Арт</span>
			</h1>
		</Region>
	)
}

export default Hero
