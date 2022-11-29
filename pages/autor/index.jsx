import React from "react"
import Wrapper from "../../components/layout/Wrapper"
import Region from "../../components/layout/Region"
import Login from "../../components/Login"
import Dashboard from "../../components/Dashboard"
import { useContext } from "react"
import LoginCtx from "../../store/LoginCtx"

const Autor = () => {
	const { user } = useContext(LoginCtx)

	return (
		<Region>
			<Wrapper>
				<div className="center">
					{user === null ? <Login></Login> : <Dashboard></Dashboard>}
				</div>
			</Wrapper>
		</Region>
	)
}

export default Autor
