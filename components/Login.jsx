import { React } from "react"
import { useState } from "react"
import { auth } from "../public/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import Loader from "./Loader"

const Login = () => {
	const [loginError, setLoginError] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const loginHandler = (e) => {
		setLoading(true)
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				router.push("/autor", undefined, { shallow: true })
				setLoading(false)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				setLoginError(true)
				setLoading(false)
			})
		setEmail("")
		setPassword("")
	}

	return (
		<div className="center">
			<form className="[ stack ] [ z-top ]" onSubmit={loginHandler}>
				<div className="d-flex-c">
					<label htmlFor="email">Email</label>
					<input
						// ref={emailRef}
						type="text"
						name="email"
						id="email"
						autoCapitalize="none"
						autoCorrect="off"
						required
						pattern="[^@]+@[^\.]+\..+"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						value={email}
					/>
				</div>
				<div className="d-flex-c">
					<label htmlFor="password">Password</label>
					<input
						// ref={passRef}
						type="password"
						name="password"
						id="password"
						required
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						value={password}
					/>
				</div>
				<button className="button">Prijava</button>
				<div className="center">{loading ? <Loader></Loader> : ""}</div>
				{loginError && (
					<div
						aria-atomic="true"
						role="alert"
						className="signup-alert"
					>
						Pogrešan username ili password. Pokušajte ponovo.
					</div>
				)}
			</form>
		</div>
	)
}

export default Login
