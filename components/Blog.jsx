import React, { useState } from "react"
// import ReactQuill from "react-quill"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

const Blog = () => {
	const [quillValue, setQuillValue] = useState("")

	const contentInputHandler = () => {}
	return (
		<div>
			<ReactQuill
				theme="snow"
				value={quillValue}
				onChange={setQuillValue}
			/>
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
			</form>
		</div>
	)
}

export default Blog
