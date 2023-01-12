import React, { useState, useEffect } from "react"
import Head from "next/head"
import { sendContactForm } from "../lib/api"
import Loader from "../components/Loader"

const contact = () => {
	const [hasMounted, setHasMounted] = useState(false)
	const [contactFormData, setContactFormData] = useState({})
	const [contactFormProccess, setContactFormProccess] = useState({
		success: false,
		error: false,
		loading: false,
	})

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		setContactFormProccess((prev) => ({ ...prev, loading: true }))
		try {
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
		<div>
			<Head>
				<title>BojeArt - Kontakt</title>
				<meta
					name="description"
					content="Kontakt stranica BojeArt.com"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="stack">
				<div className="center">
					<h1>Ne budi stranac!</h1>
					{!contactFormProccess.success &&
					contactFormProccess.error ? (
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
					{contactFormProccess.loading ? <Loader></Loader> : ""}
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
		</div>
	)
}

export default contact
