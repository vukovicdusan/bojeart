import React from "react"
import * as styles from "../styles/Modal.module.css"
import { useRouter } from "next/router"

const Modal = (props) => {
	let router = useRouter()
	const closeEditModalHandler = (e) => {
		e.preventDefault(e)
		props.editImage && props.editImage(false)
		router.push({ pathname: "/" }, undefined, {
			scroll: false,
			shallow: true,
		})
	}

	return (
		<dialog className={styles.modalWrapper}>
			<button
				onClick={closeEditModalHandler}
				className={`${styles.modalClose} [ button ] [ button-ghost ]`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="#f8f8ff"
				>
					<path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
				</svg>
			</button>
			<div className={styles.modalBody}>{props.children}</div>
		</dialog>
	)
}

export default Modal