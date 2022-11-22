import React from "react"
import Wrapper from "../components/layout/Wrapper"
import Region from "../components/layout/Region"
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"

const Autor = () => {
	const uploadImageHandler = (e) => {
		e.preventDefautl()
	}

	const inputChangeHandler = (e) => {}
	return (
		<Region>
			<Wrapper>
				<div className="stack">
					<h1>Добродошао Бојане.</h1>
					<form onSubmit={uploadImageHandler} className="stack">
						<div className="d-flex-c">
							<label htmlFor="uploadImage">
								Постави нову слику
							</label>
							<input
								name="uploadImage"
								id="uploadImage"
								onChange={inputChangeHandler}
								type="file"
								required
								autoCorrect="off"
							/>
						</div>
						<div className="d-flex-c">
							<label htmlFor="imageDescription">Опис</label>
							<textarea
								name="imageDescription"
								id="imageDescription"
								onChange={inputChangeHandler}
								type="text"
								required
								autoCorrect="off"
							/>
						</div>
						<div className="d-flex-c">
							<label htmlFor="imagePrice">Цена</label>
							<input
								name="imagePrice"
								id="imagePrice"
								onChange={inputChangeHandler}
								type="text"
								required
								autoCorrect="off"
							/>
						</div>

						<button className="button">Уплоадуј</button>
					</form>
				</div>
			</Wrapper>
		</Region>
	)
}

export default Autor
