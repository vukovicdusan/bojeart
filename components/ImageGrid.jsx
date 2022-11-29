import React, { useState } from "react"
import Region from "../components/layout/Region"
import * as styles from "../styles/ImageGrid.module.css"
import Painting from "./Painting"
import GridListSwitcher from "./GridListSwitcher"

const ImageGrid = (props) => {
	const [filter, setFilter] = useState("")
	const [grid, setGrid] = useState(true)
	const changeAuthorHandler = (e) => {
		e.preventDefault()
		switch (e.target.innerHTML.toLowerCase()) {
			case "bojan":
				setFilter("bojan@gmail.com")
				break
			case "jelena":
				setFilter("jelena@gmail.com")
				break
			case "zajedno":
				setFilter("")
		}
	}
	const gridListSwitcherHandler = (e) => {
		setGrid(e)
	}
	let filteredImgs =
		filter !== ""
			? props.imgList.reverse().filter((img) => img.author === filter)
			: props.imgList.reverse()

	return (
		<Region>
			<div className={`${styles.gridStack} [ stack ]`}>
				<div className={`${styles.gridWrap} [ wrap ]`}>
					<button className="button" onClick={changeAuthorHandler}>
						Jelena
					</button>
					<button className="button" onClick={changeAuthorHandler}>
						Zajedno
					</button>
					<button className="button" onClick={changeAuthorHandler}>
						Bojan
					</button>
					<GridListSwitcher
						switcher={gridListSwitcherHandler}
					></GridListSwitcher>
				</div>
				<div
					className={`${styles.imgGridList} ${
						grid ? "[ grid ]" : "[ stack ]"
					} [ mr-bs-4 ]`}
				>
					{filteredImgs.map((img) => (
						<Painting
							key={img.id}
							imgWidth={grid ? "100%" : "700px"}
							imgProp={img}
						></Painting>
					))}
				</div>
			</div>
		</Region>
	)
}

export default ImageGrid
