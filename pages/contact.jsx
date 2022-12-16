import React, { useState } from "react"

const contact = () => {
	const [mailInfo, setMailInfo] = useState("")
	const [message, setMessage] = useState("")

	const onSubmitHandler = () => {
		e.preventDefault()
	}
	const inputHandler = (e) => {
		e.target.name === "email"
			? setMailInfo(e.target.value)
			: setMessage(e.target.value)
	}
	console.log(mailInfo, message)
	return (
		<div className="stack">
			<div className="center">
				<h1>Ne budi stranac!</h1>
			</div>
			<div className="center">
				<form
					onSubmit={onSubmitHandler}
					className="[ stack ] [ z-top ]"
				>
					<div className="d-flex-c">
						<label htmlFor="email">Tvoj Mail</label>
						<input
							type="text"
							name="email"
							id="email"
							autoCapitalize="none"
							autoCorrect="off"
							required
							pattern="[^@]+@[^\.]+\..+"
							onChange={inputHandler}
						/>
					</div>
					<div className="d-flex-c">
						<label htmlFor="message">Poruka</label>
						<textarea
							name="message"
							id="message"
							type="text"
							required
							autoCorrect="off"
							onChange={inputHandler}
						/>
					</div>
					<button className="button">Pošalji.</button>
				</form>
			</div>
		</div>
	)
}

export default contact
