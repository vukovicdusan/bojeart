import React from "react"
import Region from "../../components/layout/Region"
import Login from "../../components/Login"
import Dashboard from "../../components/Dashboard"
import { useContext } from "react"
import LoginCtx from "../../store/LoginCtx"

const Autor = () => {
	const { user } = useContext(LoginCtx)

	return (
		<Region>
			<div className="center">
				{user === null ? <Login></Login> : <Dashboard></Dashboard>}
			</div>
		</Region>
	)
}

export default Autor
