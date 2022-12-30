import React, { useState, useContext } from "react"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../public/firebase/firebase"
import { useRouter } from "next/router"
import LoginContext from "../store/LoginCtx"

const EditImageModal = (props) => {
	const [imgName, setImgName] = useState(props.editModalData.imgName)
	const [year, setYear] = useState(props.editModalData.year)
	const [material, setMaterial] = useState(props.editModalData.material)
	const [dimensions, setDimensions] = useState(props.editModalData.dimensions)
	const [category, setCategory] = useState(props.editModalData.category)

	const user = useContext(LoginContext)
	let router = useRouter()

	const inputChangeHandler = (e) => {
		e.preventDefault()
		e.target.name === "imgName" && setImgName(e.target.value)
		e.target.name === "year" && setYear(e.target.value)
		e.target.name === "material" && setMaterial(e.target.value)
		e.target.name === "dimensions" && setDimensions(e.target.value)
		e.target.name === "category" && setCategory(e.target.value)
	}

	const editImageSubmitHandler = async (e) => {
		e.preventDefault()
		try {
			const imageRef = doc(db, "slike", props.editModalData.id)
			await updateDoc(imageRef, {
				imgName: imgName,
				year: year,
				material: material,
				dimensions: dimensions,
				category: category,
			})
		} catch (err) {
			console.log(err)
		}
		// closeEditModalHandler(e)
		router.reload({ shallow: true })
	}

	const deleteImageHandler = async () => {
		await deleteDoc(doc(db, "slike", props.editModalData.id))
	}

	// const closeEditModalHandler = (e) => {
	// 	e.preventDefault(e)
	// 	props.editImage(false)
	// }

	const author = user === "jelena@gmail.com" ? "jelena" : "bojan"

	return (
		<form
			onSubmit={editImageSubmitHandler}
			className="[ edit-modal-wrapper ] [ stack ]"
		>
			<h3>Izmeni informacije</h3>
			<div className="d-flex-c">
				<label htmlFor="imgName">Ime Slike</label>
				<textarea
					placeholder={props.editModalData.imgName}
					name="imgName"
					id="imgName"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="year">Godina</label>
				<input
					placeholder={props.editModalData.year}
					name="year"
					id="year"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="material">Materijal</label>
				<input
					placeholder={props.editModalData.material}
					name="material"
					id="material"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="dimensions">Dimenzije</label>
				<input
					placeholder={props.editModalData.dimensions}
					name="dimensions"
					id="dimensions"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="category">Kategorija</label>
				<select
					value={props.editModalData.category}
					name="category"
					id="category"
					onChange={inputChangeHandler}
					required
				>
					{author === "bojan" ? (
						<>
							<option value="brodovi">Brodovi</option>
							<option value="ptice">Ptičice</option>
							<option value="apstrakcije">Apstrakcije</option>
						</>
					) : (
						<>
							<option value="crtezi">Crteži</option>
							<option value="slike">Slike</option>
						</>
					)}
				</select>
			</div>
			<div className="wrap">
				<button className="button">Izmeni</button>
				<button
					onClick={deleteImageHandler}
					className="[ button ] [ signup-alert ]"
				>
					Obriši sliku
				</button>
			</div>
		</form>
	)
}

export default EditImageModal
