import React, { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import * as styles from "../styles/About.module.css"
import portrait1 from "../public/images/dushawn-jovic-2w7qbVHOqYU-unsplash.jpg"
import portrait2 from "../public/images/kumpan-electric-4QhDfdkzHUY-unsplash.jpg"
import Region from "../components/layout/Region"

const about = () => {
	const [filter, setFilter] = useState("jelena")

	const authorFilterHandler = (e) => {
		e.preventDefault()
		switch (e.target.innerHTML.toLowerCase()) {
			case "bojan":
				setFilter("bojan")
				break
			case "jelena":
				setFilter("jelena")
				break
		}
	}
	const bojanAbout =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tempora tenetur velit illo voluptatem expedit anatus numquam veritatis porro ipsam delectusnecessitatibus rerum, eligendi aperiam. Officia facilisanimi atque aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat modi excepturi consequatur consequuntur cupiditate itaque odit, ullamdolor aut. Digniss imos aperiam, quaerat ducimus,voluptate consequ untur ipsa odio sapiente veritatisnihil laudantium voluptatibus harum vero quis autem cum! Nam, expedita in."

	const jelenaAbout =
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus id soluta fuga inventore et natus possimus provident doloribus animi cupiditate maiores quasi, omnis perferendis voluptate nobis ipsam? Cupiditate vel ipsa earum aliquam officia voluptatum dicta quae explicabo quas dolore nihil harum assumenda natus quisquam atque tempora, distinctio fugiat. Tenetur molestias praesentium nihil eum repudiandae eius ex, veritatis quae nostrum earum laboriosam. Incidunt veniam voluptatibus explicabo optio excepturi deleniti, iusto, quia ad laudantium culpa recusandae? Ut quis quisquam distinctio quaerat voluptatibus?"

	return (
		<Region>
			<Head>
				<title>BojeArt - O nama</title>
				<meta
					name="description"
					content="Stranica o Bojanu Saviću i Jeleni Tijanić Savić."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="stack">
				<h1 className="center">Ovo smo mi.</h1>
				<div className="[ wrap ] [ center ] [ center-row ]">
					<button
						aria-label="autor filter"
						className={
							filter === "jelena"
								? `${styles.activeBtn} [ button ]`
								: "[ button ]"
						}
						onClick={authorFilterHandler}
					>
						Jelena
					</button>
					<button
						aria-label="autor filter"
						className={
							filter === "bojan"
								? `${styles.activeBtn} [ button ]`
								: "[ button ]"
						}
						onClick={authorFilterHandler}
					>
						Bojan
					</button>
				</div>
				<div
					className={`${styles.aboutSwitcher} [ switcher ] ${
						filter !== "jelena" ? styles.rowReverse : ""
					}`}
				>
					<div className="p-relative">
						<Image
							src={filter === "jelena" ? portrait1 : portrait2}
							fill
							sizes="(max-width: 730px) 100vw, 50vw"
							alt="artist"
							placeholder="blur"
							blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABQFJREFUSEtV1VurJFcZgOG3Tl3HVWut6t0zmUwkMiMRJOqVd/4noxKQMBqE4JmI8YCRxDggCKKTfyGYq6AgKhJhZkjcu491WNXd1YeSVd0ze3JfPLx86/so58H9+/2xP7LfdWw3LWtT0dYL2nLGenXJtrykNyu8Y0gUTUjzm2R6QlaMyZQiVYJEpIRZTBiH+JGPH3i4nosz4McnuGHdVrTVEvMs3p7xcEIqT7jQYzKtSKQgyVOiNGaUjAjCAM/ivsXfe1K+HcrbodziU9rV1VB+NOV1ubyBsOUDLkllTpInT3E/fLb8nd/1fX9kt+vYWLytMPWCppxhVldsyksOpsLrI+LogjS/gSgm5LogU/I8loQwjc7l/rncwXnw9nt9fzyy259wYyrqekFdzWhWV7TllENb4x0jovgCkU/IiwuELhAWl9m5PGQUB+eZuzh25u//4rfDg3a2fNvSmIqqWVCVM8rVFFNN2RmD28ck8RghJ0g9RhYaoXIyi4uYKA0ZJT52LF7g4HoOzvs/ffcpvt4a6rairJcsqxnL1ZSqmrNt1wOexmOkvEAXBVJrciUQMiUWEVE6YhT7BJE34I7FH/zonf54PNDtO9ptO+DLesm8mjEvZ8yrOabd4vYJIiko1AVjXaC1RA54QjLgAaPYww9dvJEtB+fBG78Zyre77YCXbcWiWTKt5lyWMz6plszXOxwSxknBTTXmRqEZa4lSGSJPSMVowMPYxQ+dAXcs/ufXfz3s+XbfYbaG1bpm3iy5rOY8Lmf8pyp5uN6Dk/JcWnBXFdzWmkmRU8iMXEYDHqf+NR70J/xPr/2qPwz4FrNtB3zaLPm4XvDfcs4HVQXrI7gpZJqXVMHdQnNLC8YqReYxmQhIUo9R7BDY8qDH9XqcP7768/5gx7LvaM74lVnyuF7wr3LBP+oG1j142YCjC76qJZ/ROROVoPMIIQLixCNKLM41/odv/Ow08zO+XNdY/GGz5G/Vkoe1gY3zDK75spbcUTk3VUKRh+QiIE09whhGIfi23O9xfv/Km9d413LCywH/oFoxb1rYuuAJyBQozee05PNacEuljPMQOeAucexc43Ys97/2k0/jm2v8L3VJ02yg8864BqV4QUteVoLnVcJFHqFEQJZ6Ax6GPX4Ani1/95Ufnrbl0GG69fCgV23Jo2bFX5uKymyh869xqbitJC9rwW2ZciFDdBaQZR5J7BKFEAQ9ng/O21//3ulC9ztM17LaNMzaksdNyYdNzbTtoAvAF5BokIoXteQLtlymTGSEFgEi9UljhyhyCOzndiy//OYbZ7yj7daUm4Z5W/GxKfln0/Cw3cFudCpPFEi7jpKXhrGkTHKLj8gtnrjEocPIfm73/K1Xv3vCD7sBrzcNi7bmf6bko8bwb3tAFnevy78kJXd0zq2n5SFywL0BD0cOvsXf/NbrA77b71gPuGHZVkxNzSNj+Pv6cMbzU3mu+IpSvKgEzw14jBYWD8gSjyRyCQMH3878x6995ym+6dY0G0PZ1szaik9My4ftgcPOXkYOsSLPFV+UdmMsnnEhYwqLZwEi9k/4yD2V/+Devb4/9uwOHZtug9kYqrZmYWouTctH6yPTARcQa14QirvKbozgpsqY5PFwpSoNEInFvXO5g/P9b987/aAPO2x5e8aXpuHKtDxaH3m8D8E9ld8Ris8qxfP2Qp+U5xEyHZ1xlyhw8X2H/wO4ArWA9xUOigAAAABJRU5ErkJggg==`}
						></Image>
					</div>
					<div>
						<h3>{filter === "jelena" ? "Jelena" : "Bojan"}</h3>
						<p>{filter === "jelena" ? jelenaAbout : bojanAbout}</p>
					</div>
				</div>
			</div>
		</Region>
	)
}

export default about
