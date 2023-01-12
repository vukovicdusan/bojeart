import React, { useState, useEffect } from "react"
import * as styles from "../styles/GridListSwitcher.module.css"

const GridListSwitcher = (props) => {
	const [grid, setGrid] = useState(true)

	const gridListSwitcher = () => {
		grid ? setGrid(false) : setGrid(true)
	}

	useEffect(() => {
		props.switcher(grid)
	}, [grid])

	return (
		<button
			className={`${styles.gridListSwitcher} [ button ] [ button-ghost ] [ button-icon ]`}
			onClick={gridListSwitcher}
			role="button"
		>
			{grid ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z" />
				</svg>
			)}
		</button>
	)
}

export default GridListSwitcher
