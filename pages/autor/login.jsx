import { useContext, React } from "react"
import Wrapper from "../../components/layout/Wrapper"
import Region from "../../components/layout/Region"
import { useState } from "react"
import { auth } from "../../public/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import LoginContext from "../../store/LoginCtx"

const Login = () => {
	const [loginError, setLoginError] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const router = useRouter()

	const loginContext = useContext(LoginContext)

	const loginHandler = (e) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				// ...
				loginContext.dispatch({ type: "LOGIN", payload: user })
				console.log(user)
				router.push("/autor")
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				setLoginError(true)
			})
	}

	// const inputChangeHandler = (e) => {}
	console.log(loginContext.user)
	return (
		<Region>
			<Wrapper>
				<div className="center">
					<form className="stack" onSubmit={loginHandler}>
						<div className="d-flex-c">
							<label htmlFor="email">Email</label>
							<input
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
							/>
						</div>
						<div className="d-flex-c">
							<label htmlFor="password"></label>
							<input
								type="password"
								name="password"
								id="password"
								required
								onChange={(e) => {
									setPassword(e.target.value)
								}}
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
			</Wrapper>
		</Region>
	)
}

export default Login
