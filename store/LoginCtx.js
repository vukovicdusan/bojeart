import React, { useEffect, useReducer } from "react"
import LoginReducer from "../reducers/LoginReducer"

const init_state = {
	currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
}

export const LoginContext = React.createContext(init_state)

export const LoginContextProvider = (props) => {
	useEffect(() => {
		localStorage.setItem(
			"currentUser",
			JSON.stringify(currentUser.currentUser.email)
		)
	})

	const [currentUser, dispatch] = useReducer(LoginReducer, init_state)

	const ctxValue = {
		user: currentUser.email,
		dispatch,
	}
	return (
		<LoginContext.Provider value={ctxValue}>
			{props.children}
		</LoginContext.Provider>
	)
}

export default LoginContext
