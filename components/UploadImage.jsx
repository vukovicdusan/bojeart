import React, { useState } from "react"

const UploadImage = () => {
	const [image, setImage] = useState(null)
	const [createObjectURL, setCreateObjectURL] = useState(null)

	const uploaToClient = (e) => {
		if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0]

			setImage(img)
			setCreateObjectURL(URL.createObjectURL(img))
		}
	}
	const uploadToServer = async (e) => {
		try {
			const body = new FormData()
			body.append("file", image)
			const response = await fetch("/api/upload", {
				method: "POST",
				body,
			})
		} catch (error) {
			console.log(error.response?.data)
		}
	}
	return (
		<>
			<img src={createObjectURL} alt="" />
			<form>
				<button onClick={uploadToServer} type="button">
					Upload image
				</button>
				<input type="file" onChange={uploaToClient} />
			</form>
		</>
	)
}

export default UploadImage
