import React, { useState } from "react"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../public/firebase/firebase"
import { useRouter } from "next/router"
const ReactQuill =
	typeof window === "object" ? require("react-quill") : () => false
import "react-quill/dist/quill.snow.css"

const EditProjectModal = (props) => {
	const [quillValue, setQuillValue] = useState("")
	const [titleValue, setTitleValue] = useState("")

	const quillModules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike"],
			["blockquote"],
			[{ color: [] }],
			[{ list: "ordered" }],
			[{ list: "bullet" }],
			["link", "image", "video"],
			[{ align: [] }],
		],
	}

	let router = useRouter()

	const editContentHandler = async (e) => {
		e.preventDefault()
		try {
			const postRef = doc(db, "blog", props.editProjectData.id)
			await updateDoc(postRef, {
				title: titleValue,
				content: quillValue,
			})
		} catch (err) {
			console.log(err)
		}
		router.reload({ shallow: true })
	}

	const deletePostHandler = async () => {
		await deleteDoc(doc(db, "blog", props.editProjectData.id))
	}

	return (
		<div className="[ edit-modal-wrapper ] [ stack ]">
			<h3>Izmeni sadržaj</h3>

			<ReactQuill
				theme="snow"
				defaultValue={props.editProjectData.content}
				onChange={setQuillValue}
				modules={quillModules}
			/>

			<form onSubmit={editContentHandler} className="[ stack ] [ z-top ]">
				<div className="d-flex-c">
					<label htmlFor="title">Naslov</label>
					<input
						name="title"
						id="title"
						onChange={(e) => setTitleValue(e.target.value)}
						type="text"
						required
						autoCorrect="off"
						defaultValue={props.editProjectData.title}
					/>
				</div>

				<div className="wrap">
					<button className="button">Postavi</button>
					<button
						onClick={deletePostHandler}
						className="[ button ] [ signup-alert ]"
					>
						Obriši objavu
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditProjectModal
