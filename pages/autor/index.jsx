import React from "react"
import Wrapper from "../../components/layout/Wrapper"
import Region from "../../components/layout/Region"
import Login from "./login"
import Dashboard from "../../components/Dashboard"

const Autor = () => {
	return (
		<Region>
			<Wrapper>
				<div className="center">
					{/* <Login></Login> */}
					<Dashboard></Dashboard>
				</div>
			</Wrapper>
		</Region>
	)
}
// export const getServerSideProps = async (ctx) => {
// 	const user = ctx.user
// 	if (!user)
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		}
// }

export default Autor
