import { onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"

import { auth } from "../public/firebase/firebase"

const init_state = {}

export const LoginContext = React.createContext(init_state)

export const LoginContextProvider = (props) => {
	const [userState, setUserState] = useState(null)
	const [loadingState, setLoadingState] = useState(false)

	useEffect(() => {
		setLoadingState(true)
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserState(user.email)
				setLoadingState(false)
			} else {
				setUserState(null)
				setLoadingState(false)
			}
		})
	}, [])

	const ctxValue = {
		user: userState,
		loader: loadingState,
	}
	return (
		<LoginContext.Provider value={ctxValue}>
			{props.children}
		</LoginContext.Provider>
	)
}

export default LoginContext
