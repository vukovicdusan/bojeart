import React, { useState } from "react"
import Region from "../components/layout/Region"
import * as styles from "../styles/ImageGrid.module.css"
import Painting from "./Painting"
import GridListSwitcher from "./GridListSwitcher"
import Modal from "./Modal"
import { useRouter } from "next/router"
import EditImageModal from "./EditImageModal"
import CategoryFilter from "./CategoryFilter"
import ProjectItem from "./projects/ProjectItem"
import Image from "next/image"
// import Splatter from "./Splatter"

const ImageGrid = (props) => {
	const [filter, setFilter] = useState("")
	const [grid, setGrid] = useState(true)
	const [editModalData, setEditModalData] = useState("")
	const [openEditModal, setOpenEditModal] = useState(false)
	const [categoriesFilter, setCategoriesFilter] = useState("")

	const authorFilterHandler = (e) => {
		e.preventDefault()
		setCategoriesFilter("")
		switch (e.target.innerHTML.toLowerCase()) {
			case "bojan":
				setFilter("bojan")
				break
			case "jelena":
				setFilter("jelena")
				break
			case "sve":
				setFilter("")
		}
	}

	const catFilterHandler = (category) => {
		setCategoriesFilter(category)
	}

	const gridListSwitcherHandler = (e) => {
		setGrid(e)
	}

	const editImage = (data, modalOpen) => {
		setEditModalData(data)
		setOpenEditModal(modalOpen)
	}

	let router = useRouter()

	return (
		<Region>
			{openEditModal && (
				<Modal editImage={editImage}>
					<EditImageModal
						editImage={editImage}
						editModalData={editModalData}
					></EditImageModal>
				</Modal>
			)}
			{router.query.image ? (
				<Modal>
					<Image
						className={styles.modalImg}
						width={800}
						height={500}
						// fill
						src={router.query.image}
						alt="slika"
						// quality={100}
						// placeholder="blur"
						// blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABQFJREFUSEtV1VurJFcZgOG3Tl3HVWut6t0zmUwkMiMRJOqVd/4noxKQMBqE4JmI8YCRxDggCKKTfyGYq6AgKhJhZkjcu491WNXd1YeSVd0ze3JfPLx86/so58H9+/2xP7LfdWw3LWtT0dYL2nLGenXJtrykNyu8Y0gUTUjzm2R6QlaMyZQiVYJEpIRZTBiH+JGPH3i4nosz4McnuGHdVrTVEvMs3p7xcEIqT7jQYzKtSKQgyVOiNGaUjAjCAM/ivsXfe1K+HcrbodziU9rV1VB+NOV1ubyBsOUDLkllTpInT3E/fLb8nd/1fX9kt+vYWLytMPWCppxhVldsyksOpsLrI+LogjS/gSgm5LogU/I8loQwjc7l/rncwXnw9nt9fzyy259wYyrqekFdzWhWV7TllENb4x0jovgCkU/IiwuELhAWl9m5PGQUB+eZuzh25u//4rfDg3a2fNvSmIqqWVCVM8rVFFNN2RmD28ck8RghJ0g9RhYaoXIyi4uYKA0ZJT52LF7g4HoOzvs/ffcpvt4a6rairJcsqxnL1ZSqmrNt1wOexmOkvEAXBVJrciUQMiUWEVE6YhT7BJE34I7FH/zonf54PNDtO9ptO+DLesm8mjEvZ8yrOabd4vYJIiko1AVjXaC1RA54QjLgAaPYww9dvJEtB+fBG78Zyre77YCXbcWiWTKt5lyWMz6plszXOxwSxknBTTXmRqEZa4lSGSJPSMVowMPYxQ+dAXcs/ufXfz3s+XbfYbaG1bpm3iy5rOY8Lmf8pyp5uN6Dk/JcWnBXFdzWmkmRU8iMXEYDHqf+NR70J/xPr/2qPwz4FrNtB3zaLPm4XvDfcs4HVQXrI7gpZJqXVMHdQnNLC8YqReYxmQhIUo9R7BDY8qDH9XqcP7768/5gx7LvaM74lVnyuF7wr3LBP+oG1j142YCjC76qJZ/ROROVoPMIIQLixCNKLM41/odv/Ow08zO+XNdY/GGz5G/Vkoe1gY3zDK75spbcUTk3VUKRh+QiIE09whhGIfi23O9xfv/Km9d413LCywH/oFoxb1rYuuAJyBQozee05PNacEuljPMQOeAucexc43Ys97/2k0/jm2v8L3VJ02yg8864BqV4QUteVoLnVcJFHqFEQJZ6Ax6GPX4Ani1/95Ufnrbl0GG69fCgV23Jo2bFX5uKymyh869xqbitJC9rwW2ZciFDdBaQZR5J7BKFEAQ9ng/O21//3ulC9ztM17LaNMzaksdNyYdNzbTtoAvAF5BokIoXteQLtlymTGSEFgEi9UljhyhyCOzndiy//OYbZ7yj7daUm4Z5W/GxKfln0/Cw3cFudCpPFEi7jpKXhrGkTHKLj8gtnrjEocPIfm73/K1Xv3vCD7sBrzcNi7bmf6bko8bwb3tAFnevy78kJXd0zq2n5SFywL0BD0cOvsXf/NbrA77b71gPuGHZVkxNzSNj+Pv6cMbzU3mu+IpSvKgEzw14jBYWD8gSjyRyCQMH3878x6995ym+6dY0G0PZ1szaik9My4ftgcPOXkYOsSLPFV+UdmMsnnEhYwqLZwEi9k/4yD2V/+Devb4/9uwOHZtug9kYqrZmYWouTctH6yPTARcQa14QirvKbozgpsqY5PFwpSoNEInFvXO5g/P9b987/aAPO2x5e8aXpuHKtDxaH3m8D8E9ld8Ris8qxfP2Qp+U5xEyHZ1xlyhw8X2H/wO4ArWA9xUOigAAAABJRU5ErkJggg==`}
					></Image>
				</Modal>
			) : null}
			<div className={`${styles.gridStack} [ stack ]`}>
				<div className={`${styles.gridWrap} [ wrap ]`}>
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
							filter === ""
								? `${styles.activeBtn} [ button ]`
								: "[ button ]"
						}
						onClick={authorFilterHandler}
					>
						Sve
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
				{filter !== "" && (
					<CategoryFilter
						catFilterHandler={catFilterHandler}
						filter={filter}
					></CategoryFilter>
				)}
				{categoriesFilter !== "projekti" ? (
					<GridListSwitcher
						switcher={gridListSwitcherHandler}
					></GridListSwitcher>
				) : null}

				<div
					className={`${styles.imgGridList} ${
						grid ? "[ grid ]" : "[ stack ]"
					} [ mr-bs-2 ]`}
				>
					{categoriesFilter === "projekti"
						? props.blogList
								?.reverse()
								.map((post) => (
									<ProjectItem
										key={post.id}
										postContent={post}
									></ProjectItem>
								))
						: props.imgList?.reverse().map((img) => (
								<Painting
									editImage={editImage}
									filter={filter}
									catFilter={categoriesFilter}
									key={img.id}
									// imgWidth={grid ? "100%" : "700px"}
									imgProp={img}
								></Painting>
						  ))}
				</div>
			</div>
			{/* <Splatter className="[ splatter ] [ splatter2 ]"></Splatter> */}
		</Region>
	)
}

export default ImageGrid
