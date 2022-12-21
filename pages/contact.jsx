import React, { useState, useEffect } from "react"
import { sendContactForm } from "../lib/api"

const contact = () => {
	const [hasMounted, setHasMounted] = useState(false)
	const [contactFormData, setContactFormData] = useState({})
	const [contactFormProccess, setContactFormProccess] = useState({
		success: false,
		error: false,
		loading: false,
		touched: false,
	})

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		try {
			setContactFormData((prev) => ({ ...prev, loading: true }))
			await sendContactForm(contactFormData)
			setContactFormProccess((prev) => ({
				...prev,
				success: true,
				loading: false,
			}))
		} catch (err) {
			console.log(err)
			setContactFormProccess((prev) => ({
				...prev,
				error: true,
				loading: false,
			}))
		}
	}

	const inputHandler = (e) => {
		e.target.name === "email"
			? setContactFormData({ ...contactFormData, email: e.target.value })
			: setContactFormData({
					...contactFormData,
					message: e.target.value,
			  })
	}

	return (
		<div className="stack">
			<div className="center">
				<h1>Ne budi stranac!</h1>
				{!contactFormProccess.success && contactFormProccess.error ? (
					<p className="signup-alert">
						Došlo je do greške. Poruka nije poslata.
					</p>
				) : !contactFormProccess.success &&
				  !contactFormProccess.error ? (
					""
				) : (
					<p className="signup-success">
						Hvala na poruci! Javljamo se!
					</p>
				)}
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
					<button className="button">Pošalji</button>
				</form>
			</div>
		</div>
	)
}

export default contact
