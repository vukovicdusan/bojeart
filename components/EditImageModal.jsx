import React, { useState } from "react"
import * as styles from "../styles/EditImageModal.module.css"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../public/firebase/firebase"
import { useRouter } from "next/router"

const EditImageModal = (props) => {
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState()
	let router = useRouter()

	const inputChangeHandler = (e) => {
		e.preventDefault()
		e.target.name === "description" && setDescription(e.target.value)
		e.target.name === "price" && setPrice(e.target.value)
	}

	const editImageSubmitHandler = async (e) => {
		e.preventDefault()
		try {
			const imageRef = doc(db, "slike", props.editModalData.id)
			await updateDoc(imageRef, {
				description: description,
				price: price,
			})
		} catch (err) {
			console.log(err)
		}
		closeEditModalHandler(e)
		router.reload()
	}

	const deleteImageHandler = async () => {
		await deleteDoc(doc(db, "slike", props.editModalData.id))
	}

	const closeEditModalHandler = (e) => {
		e.preventDefault(e)
		props.editImage(false)
	}

	return (
		<form
			onSubmit={editImageSubmitHandler}
			className={`${styles.editModalWrapper} [ stack ]`}
		>
			<h3>Izmeni informacije</h3>
			<div className="d-flex-c">
				<label htmlFor="description">opis</label>
				<textarea
					placeholder={props.editModalData.description}
					name="description"
					id="description"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="price">Cena</label>
				<input
					placeholder={props.editModalData.price}
					name="price"
					id="price"
					onChange={inputChangeHandler}
					type="text"
					autoCorrect="off"
				/>
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
