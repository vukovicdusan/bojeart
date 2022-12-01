import React, { useEffect } from "react"
import { useState } from "react"

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
			className="[ button ] [ button-ghost ] [ button-icon ]"
			onClick={gridListSwitcher}
		>
			{grid ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M24 3h-24v-2h24v2zm0 3h-24v2h24v-2zm0 5h-24v2h24v-2zm0 5h-24v2h24v-2zm0 5h-24v2h24v-2z" />
				</svg>
			)}
		</button>
	)
}

export default GridListSwitcher
