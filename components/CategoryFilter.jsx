import React from "react"
import * as styles from "../styles/CategoryFilter.module.css"

const CategoryFilter = (props) => {
	const changeFilterHandler = (e) => {
		switch (e.target.innerHTML.toLowerCase()) {
			case "brodovi":
				props.catFilterHandler("brodovi")
				break
			case "ptičice":
				props.catFilterHandler("ptice")
				break
			case "apstrakcije":
				props.catFilterHandler("apstrakcije")
				break
			case "izložbe":
				props.catFilterHandler("projekti")
				break
			case "crteži":
				props.catFilterHandler("crtezi")
				break
			case "slike":
				props.catFilterHandler("slike")
		}
	}
	return (
		<ul className={`${styles.categoryWrap} [ wrap ]`}>
			{props.filter === "bojan" ? (
				<>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Brodovi
						</button>
					</li>
					<span className="spacer"></span>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Ptičice
						</button>
					</li>
					<span className="spacer"></span>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Apstrakcije
						</button>
					</li>
					<span className="spacer"></span>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Izložbe
						</button>
					</li>
				</>
			) : (
				<>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Slike
						</button>
					</li>
					<span className="spacer"></span>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Crteži
						</button>
					</li>
					<span className="spacer"></span>
					<li>
						<button
							onClick={changeFilterHandler}
							className="[ button ] [ button-ghost ]"
						>
							Izložbe
						</button>
					</li>
				</>
			)}
		</ul>
	)
}

export default CategoryFilter
