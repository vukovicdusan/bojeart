import React, { useState, useContext } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { storage, db } from "../public/firebase/firebase"
import { useRouter } from "next/router"
import LoginCtx from "../store/LoginCtx"

const date = new Date()
const writeDate = date.toLocaleDateString("sr-RS")

const UploadBlog = () => {
	const [quillValue, setQuillValue] = useState("")
	const [titleValue, setTitleValue] = useState("")
	const [blogImage, setBlogImage] = useState("")
	const [progress, setProgress] = useState(null)
	const { user } = useContext(LoginCtx)
	const router = useRouter()

	const author = user === "jelena@gmail.com" ? "jelena" : "bojan"

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
			// [{ script: "sub" }, { script: "super" }],
		],
	}

	const contentInputHandler = (e) => {
		e.preventDefault()
		try {
			const imgName = date.getTime() + author + "blog"
			const storageRef = ref(storage, imgName)
			const uploadTask = uploadBytesResumable(storageRef, blogImage)
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
					// setImgUploaded(true)
				},
				(error) => {
					// Handle unsuccessful uploads
					console.log(error)
				},
				() => {
					// Handle successful uploads on complete
					getDownloadURL(uploadTask.snapshot.ref).then(
						async (downloadURL) => {
							await addDoc(collection(db, "blog"), {
								author: author,
								date: writeDate,
								image: downloadURL,
								content: quillValue,
								title: titleValue,
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

	const imageInputHandler = (e) => {
		setBlogImage(e.target.files[0])
	}

	return (
		<div className="stack">
			<ReactQuill
				theme="snow"
				value={quillValue}
				onChange={setQuillValue}
				modules={quillModules}
				placeholder={"Piši ovde..."}
			/>
			<form
				onSubmit={contentInputHandler}
				className="[ stack ] [ z-top ]"
			>
				<div className="d-flex-c">
					<label htmlFor="title">Naslov</label>
					<input
						name="title"
						id="title"
						onChange={(e) => setTitleValue(e.target.value)}
						type="text"
						required
						autoCorrect="off"
					/>
				</div>
				<div className="d-flex-c">
					<label htmlFor="file">Dodaj sliku</label>
					<input
						name="file"
						id="file"
						onChange={imageInputHandler}
						type="file"
						required
						autoCorrect="off"
					/>
				</div>
				<button className="button">Postavi</button>
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
						<p>{Math.floor(progress)}%</p>
					</div>
				)}
			</form>
		</div>
	)
}

export default UploadBlog
