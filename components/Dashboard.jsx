import React, { useReducer, useContext, useEffect, useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import ImageReducer from "../reducers/ImageReducer"
import LoginCtx from "../store/LoginCtx"
import { storage, db } from "../public/firebase/firebase"

const date = new Date()
const writeDate = date.toLocaleDateString("sr-RS")

const init_state = {
	author: "",
	date: writeDate,
	description: "",
	image: "",
	price: "",
}

const Dashboard = () => {
	const [imgUploaded, setImgUploaded] = useState(false)
	const [progress, setProgress] = useState(null)
	const [imageState, dispatch] = useReducer(ImageReducer, init_state)
	const { user } = useContext(LoginCtx)

	const author = user === "jelena@gmail.com" ? "jelena" : "bojan"

	useEffect(() => {
		imgUploaded &&
			dispatch({
				type: "RESET",
				payload: init_state,
			})
		setImgUploaded(false)
	}, [imgUploaded])

	const uploadImageHandler = (e) => {
		e.preventDefault()
		try {
			const imgName = date.getTime() + author
			const storageRef = ref(storage, imgName)
			const uploadTask = uploadBytesResumable(
				storageRef,
				imageState.image
			)
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log("Upload is " + progress + "% done")
					setProgress(progress)
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused")
							break
						case "running":
							console.log("Upload is running")
							break
					}
					setImgUploaded(true)
				},
				(error) => {
					// Handle unsuccessful uploads
					console.log(error)
				},
				() => {
					// Handle successful uploads on complete
					getDownloadURL(uploadTask.snapshot.ref).then(
						async (downloadURL) => {
							await addDoc(collection(db, "slike"), {
								author: imageState.author,
								date: imageState.date,
								description: imageState.description,
								image: downloadURL,
								price: imageState.price,
							})
						}
					)
				}
			)
		} catch (err) {
			console.log(err)
		}
	}

	const inputChangeHandler = (e) => {
		dispatch({
			type: "IMAGE_INFO",
			payload: e.target.value,
			field: e.target.name,
			author: user,
		})
	}

	const imageInputHandler = (e) => {
		dispatch({
			type: "IMAGE_INPUT",
			payload: e.target.files[0],
		})
	}
	return (
		<div className="stack">
			<h1>
				{author === "jelena"
					? "Dobrodošla Jelena"
					: "Dobrodošao Bojane"}
			</h1>
			<form onSubmit={uploadImageHandler} className="stack">
				<div className="d-flex-c">
					<label htmlFor="file">Postavi novu sliku</label>
					<input
						value={imageState.file}
						name="file"
						id="file"
						onChange={imageInputHandler}
						type="file"
						required
						autoCorrect="off"
					/>
				</div>
				<div className="d-flex-c">
					<label htmlFor="description">Opis</label>
					<textarea
						value={imageState.description}
						name="description"
						id="description"
						onChange={inputChangeHandler}
						type="text"
						required
						autoCorrect="off"
					/>
				</div>
				<div className="d-flex-c">
					<label htmlFor="price">Cena</label>
					<input
						value={imageState.price}
						name="price"
						id="price"
						onChange={inputChangeHandler}
						type="text"
						required
						autoCorrect="off"
					/>
				</div>

				<button className="button">Uploaduj</button>
				{progress && (
					<div className="[ d-flex-c ] progress-bar--container">
						<span
							className="progress-bar"
							style={{
								width: progress + "%",
								backgroundColor:
									(progress < 30 && "red") ||
									(progress < 65 && "yellow") ||
									(progress > 65 && "green"),
							}}
						></span>
						<span>{Math.floor(progress)}%</span>
					</div>
				)}
			</form>
		</div>
	)
}

export const getServerSideProps = () => {}

export default Dashboard
