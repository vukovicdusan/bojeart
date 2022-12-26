import React, { useState } from "react"
import Region from "../components/layout/Region"
import * as styles from "../styles/ImageGrid.module.css"
import Painting from "./Painting"
import GridListSwitcher from "./GridListSwitcher"
import Modal from "./Modal"
import EditImageModal from "./EditImageModal"
import CategoryFilter from "./CategoryFilter"
import ProjectItem from "./projects/ProjectItem"
import Image from "next/image"
import Loader from "../components/Loader"
import ClientOnly from "./ClientOnly"
import EditProjectModal from "./projects/EditProjectModal"

const ImageGrid = (props) => {
	const [filter, setFilter] = useState("")
	const [grid, setGrid] = useState(true)
	const [editModalData, setEditModalData] = useState("")
	const [openEditModal, setOpenEditModal] = useState(false)
	const [imgModalData, setImgModalData] = useState("")
	const [openImgModal, setOpenImgModal] = useState("")
	const [openProjectModal, setOpenProjectModal] = useState(false)
	const [projectModalData, setProjectModalData] = useState("")
	const [categoriesFilter, setCategoriesFilter] = useState("")
	const [isLoaded, setIsLoaded] = useState(false)
	const [animate, setAnimate] = useState(false)

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

	const editProject = (data, modalOpen) => {
		setProjectModalData(data)
		setOpenProjectModal(modalOpen)
	}

	const openModal = (imgPropModal, isOpen) => {
		setImgModalData(imgPropModal)
		setOpenImgModal(isOpen)
	}

	const closeModal = (isOpen) => {
		setOpenImgModal(isOpen)
		setOpenEditModal(isOpen)
		setOpenProjectModal(isOpen)
		setIsLoaded(false)
		setAnimate(false)
	}

	const onLoadCallback = () => {
		setIsLoaded(true)
		setTimeout(() => {
			setAnimate(true)
		}, 200)
	}

	return (
		<Region>
			{openProjectModal ? (
				<Modal isOpenProp={openProjectModal} closeModal={closeModal}>
					<EditProjectModal
						editProject={editProject}
						editProjectData={projectModalData}
					></EditProjectModal>
				</Modal>
			) : (
				""
			)}
			{openEditModal ? (
				<Modal isOpenProp={openEditModal} closeModal={closeModal}>
					<EditImageModal
						editImage={editImage}
						editModalData={editModalData}
					></EditImageModal>
				</Modal>
			) : (
				""
			)}
			{openImgModal ? (
				<Modal isOpenProp={openImgModal} closeModal={closeModal}>
					<div className={styles.modalImgContainer}>
						{!isLoaded ? (
							<div className={styles.modalLoader}>
								<Loader></Loader>
							</div>
						) : (
							""
						)}

						<Image
							className={styles.modalImg}
							fill
							src={imgModalData.image}
							alt="slika"
							// onError={() =>
							// 	setSrc(
							// 		"../public/images/dushawn-jovic-2w7qbVHOqYU-unsplash.jpg"
							// 	)
							// }
							quality={100}
							onLoadingComplete={onLoadCallback}
						></Image>
						{isLoaded ? (
							<ClientOnly>
								<p
									className={`${
										styles.modalImgDescription
									} + '[ bold ]' + ${
										animate
											? styles.modalImgDescriptionOpen
											: ""
									}`}
								>
									{imgModalData.year +
										" - " +
										imgModalData.material +
										" - " +
										imgModalData.dimensions}
								</p>
							</ClientOnly>
						) : (
							""
						)}
					</div>
				</Modal>
			) : (
				""
			)}

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
										filter={filter}
										postContent={post}
										editProject={editProject}
									></ProjectItem>
								))
						: props.imgList
								?.reverse()
								.map((img) => (
									<Painting
										openModal={openModal}
										editImage={editImage}
										filter={filter}
										catFilter={categoriesFilter}
										key={img.id}
										imgProp={img}
									></Painting>
								))}
				</div>
			</div>
		</Region>
	)
}

export default ImageGrid
