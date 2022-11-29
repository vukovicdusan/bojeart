import { React } from "react"
import { useState } from "react"
import { auth } from "../public/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

const Login = () => {
	const [loginError, setLoginError] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	// const formRef = useRef()
	// const passRef = useRef()
	const router = useRouter()

	const loginHandler = (e) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				router.push("/autor")
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				setLoginError(true)
			})
		setEmail("")
		setPassword("")
	}

	return (
		<div className="center">
			<form className="stack" onSubmit={loginHandler}>
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
					<label htmlFor="password"></label>
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
				<button className="button">Пријава</button>
				{loginError && (
					<div
						aria-atomic="true"
						role="alert"
						className="signup-alert"
					>
						Погрешан усернаме или пасворд. Покушај поново.
					</div>
				)}
			</form>
		</div>
	)
}

export default Login
