import React, { useState } from "react"
import Image from "next/image"
import * as styles from "../styles/About.module.css"
import portrait1 from "../public/images/dushawn-jovic-2w7qbVHOqYU-unsplash.jpg"
import portrait2 from "../public/images/kumpan-electric-4QhDfdkzHUY-unsplash.jpg"
import Region from "../components/layout/Region"

const about = () => {
	const [filter, setFilter] = useState("jelena")

	const authorFilterHandler = (e) => {
		e.preventDefault()
		switch (e.target.innerHTML.toLowerCase()) {
			case "bojan":
				setFilter("bojan")
				break
			case "jelena":
				setFilter("jelena")
				break
		}
	}
	const bojanAbout =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tempora tenetur velit illo voluptatem expedit anatus numquam veritatis porro ipsam delectusnecessitatibus rerum, eligendi aperiam. Officia facilisanimi atque aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat modi excepturi consequatur consequuntur cupiditate itaque odit, ullamdolor aut. Digniss imos aperiam, quaerat ducimus,voluptate consequ untur ipsa odio sapiente veritatisnihil laudantium voluptatibus harum vero quis autem cum! Nam, expedita in."

	const jelenaAbout =
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus id soluta fuga inventore et natus possimus provident doloribus animi cupiditate maiores quasi, omnis perferendis voluptate nobis ipsam? Cupiditate vel ipsa earum aliquam officia voluptatum dicta quae explicabo quas dolore nihil harum assumenda natus quisquam atque tempora, distinctio fugiat. Tenetur molestias praesentium nihil eum repudiandae eius ex, veritatis quae nostrum earum laboriosam. Incidunt veniam voluptatibus explicabo optio excepturi deleniti, iusto, quia ad laudantium culpa recusandae? Ut quis quisquam distinctio quaerat voluptatibus?"

	return (
		<Region>
			<div className="stack">
				<h1>Ovo smo mi.</h1>
				<div className="[ wrap ] [ center ] [ center-row ]">
					<button
						aria-label="autor filter"
						className={
							filter === "jelena"
								? `${styles.activeBtn} [ button ]`
								: "[ button ]"
						}
						onClick={authorFilterHandler}
					>
						Jelena
					</button>
					<button
						aria-label="autor filter"
						className={
							filter === "bojan"
								? `${styles.activeBtn} [ button ]`
								: "[ button ]"
						}
						onClick={authorFilterHandler}
					>
						Bojan
					</button>
				</div>
				<div
					className={`${styles.aboutSwitcher} [ switcher ] ${
						filter !== "jelena" ? styles.rowReverse : ""
					}`}
				>
					<div className="p-relative">
						<Image
							src={filter === "jelena" ? portrait1 : portrait2}
							fill
							sizes="(max-width: 730px) 100vw, 50vw"
							alt="artist"
						></Image>
					</div>
					<div>
						<h3>{filter === "jelena" ? "Jelena" : "Bojan"}</h3>
						<p>{filter === "jelena" ? jelenaAbout : bojanAbout}</p>
					</div>
				</div>
			</div>
		</Region>
	)
}

export default about
