import React, { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { storage, db } from "../public/firebase/firebase"

const useWriteDb = (dbCollection, data) => {
	const [progress, setProgress] = useState(null)

	try {
		const imgName = data.date.getTime() + data.author
		const storageRef = ref(storage, imgName)
		const uploadTask = uploadBytesResumable(storageRef, imageState.image)
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
						await addDoc(collection(db, dbCollection), {
							// author: author,
							// date: imageState.date,
							// description: imageState.description,
							// image: downloadURL,
							// price: imageState.price,
							// category:
							// 	!imageState.category && author === "bojan"
							// 		? "brodovi"
							// 		: !imageState.category &&
							// 		  author === "jelena"
							// 		? "crtezi"
							// 		: imageState.category,
							...data,
							image: downloadURL,
						})
						// router.reload()
					}
				)
			}
		)
	} catch (err) {
		console.log(err)
	}
	return progress
}

export default useWriteDb
