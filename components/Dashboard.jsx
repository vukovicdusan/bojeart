import React, { useContext, useState } from "react"

import LoginCtx from "../store/LoginCtx"

import Blog from "./Blog"
import UploadPainting from "./UploadPainting"
import SetNewImage from "./SetNewImage"

const Dashboard = () => {
	const [dashboardContent, setDashboardContent] = useState("image")
	const { user } = useContext(LoginCtx)

	const author = user === "jelena@gmail.com" ? "jelena" : "bojan"

	return (
		<div className="stack">
			<h2>
				{author === "jelena"
					? "Dobrodošla Jelena"
					: "Dobrodošao Bojane"}
			</h2>
			<div className="wrap">
				<div
					className="button"
					onClick={() => setDashboardContent("image")}
				>
					Postavi sliku
				</div>
				<div
					className="button"
					onClick={() => setDashboardContent("blog")}
				>
					Piši malo
				</div>
			</div>
			{dashboardContent === "blog" ? (
				<Blog></Blog>
			) : (
				<UploadPainting></UploadPainting>
			)}
		</div>
	)
}

export default Dashboard
