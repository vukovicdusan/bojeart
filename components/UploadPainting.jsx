import React, { useReducer, useContext, useEffect, useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { storage, db } from "../public/firebase/firebase"
import ImageReducer from "../reducers/ImageReducer"
import { useRouter } from "next/router"
import LoginCtx from "../store/LoginCtx"

const date = new Date()
const writeDate = date.toLocaleDateString("sr-RS")

const init_state = {
	author: "",
	date: writeDate,
	imgName: "",
	image: "",
	year: "",
	material: "",
	dimensions: "",
}

const UploadImage = () => {
	const [imgUploaded, setImgUploaded] = useState(false)
	const [progress, setProgress] = useState(null)
	const [imageState, dispatch] = useReducer(ImageReducer, init_state)
	const { user } = useContext(LoginCtx)
	const router = useRouter()

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
					// console.log("Upload is " + progress + "% done")
					setProgress(progress)
					switch (snapshot.state) {
						case "paused":
							// console.log("Upload is paused")
							break
						case "running":
							// console.log("Upload is running")
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
								author: author,
								date: imageState.date,
								imgName: imageState.imgName,
								image: downloadURL,
								year: imageState.year,
								category:
									!imageState.category && author === "bojan"
										? "brodovi"
										: !imageState.category &&
										  author === "jelena"
										? "crtezi"
										: imageState.category,
								material: imageState.material,
								dimensions: imageState.dimensions,
							})
							router.reload()
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
			author: author,
		})
	}

	const imageInputHandler = (e) => {
		dispatch({
			type: "IMAGE_INPUT",
			payload: e.target.files[0],
		})
	}

	const author = user === "jelena@gmail.com" ? "jelena" : "bojan"

	return (
		<form onSubmit={uploadImageHandler} className="[ stack ] [ z-top ]">
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
				<label htmlFor="imgName">Ime Slike</label>
				<input
					value={imageState.imgName}
					name="imgName"
					id="imgName"
					onChange={inputChangeHandler}
					type="text"
					required
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="year">Godina</label>
				<input
					defaultValue={imageState.year}
					name="year"
					id="year"
					onChange={inputChangeHandler}
					type="text"
					required
					autoCorrect="off"
					pattern="\d+"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="material">Materijal</label>
				<input
					value={imageState.material}
					name="material"
					id="material"
					onChange={inputChangeHandler}
					type="text"
					required
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="dimensions">Dimenzije</label>
				<input
					value={imageState.dimensions}
					name="dimensions"
					id="dimensions"
					onChange={inputChangeHandler}
					type="text"
					required
					autoCorrect="off"
				/>
			</div>
			<div className="d-flex-c">
				<label htmlFor="category">Kategorija</label>
				<select
					value={imageState.category}
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
	)
}

export default UploadImage
