import { React, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import * as styles from "../styles/Painting.module.css"
import EditIcon from "./EditIcon"
import LoginCtx from "../store/LoginCtx"
import ClientOnly from "./ClientOnly"

const Painting = (props) => {
	const { user } = useContext(LoginCtx)

	const openEditImageModalHandler = () => {
		props.editImage(props.imgProp, true)
	}

	//FILTER VARIABLES
	let showAuthor = props.filter && props.filter === props.imgProp.author
	let showCat = props.catFilter && props.catFilter === props.imgProp.category
	let showImages = showCat === "" ? showAuthor : showAuthor && showCat

	return (
		<div
			className={`${styles.imgContainer} ${
				showImages || props.filter === ""
					? "p-relative"
					: "display-none"
			}`}
		>
			{user && (
				<ClientOnly>
					<button
						onClick={openEditImageModalHandler}
						className={`${styles.editButton} [ button ] [ button-ghost ]`}
					>
						<EditIcon></EditIcon>
					</button>
				</ClientOnly>
			)}
			<Link
				href={"/?image=" + props.imgProp.image}
				scroll={false}
				shallow={true}
			>
				<div className={`${styles.imgWrapper} [ frame ]`}>
					<div className={styles.imgInfo}>
						<h4>{props.imgProp.price} EUR</h4>
						<p className="text-clamp">
							{props.imgProp.date +
								" - " +
								props.imgProp.description}
						</p>
					</div>
					<Image
						className={styles.painting}
						fill
						sizes="(max-width: 695px) 100vw,
						(max-width: 1030px) 50vw,
						33vw"
						src={props.imgProp.image}
						alt="slika"
						// quality={100}
						placeholder="blur"
						blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABQFJREFUSEtV1VurJFcZgOG3Tl3HVWut6t0zmUwkMiMRJOqVd/4noxKQMBqE4JmI8YCRxDggCKKTfyGYq6AgKhJhZkjcu491WNXd1YeSVd0ze3JfPLx86/so58H9+/2xP7LfdWw3LWtT0dYL2nLGenXJtrykNyu8Y0gUTUjzm2R6QlaMyZQiVYJEpIRZTBiH+JGPH3i4nosz4McnuGHdVrTVEvMs3p7xcEIqT7jQYzKtSKQgyVOiNGaUjAjCAM/ivsXfe1K+HcrbodziU9rV1VB+NOV1ubyBsOUDLkllTpInT3E/fLb8nd/1fX9kt+vYWLytMPWCppxhVldsyksOpsLrI+LogjS/gSgm5LogU/I8loQwjc7l/rncwXnw9nt9fzyy259wYyrqekFdzWhWV7TllENb4x0jovgCkU/IiwuELhAWl9m5PGQUB+eZuzh25u//4rfDg3a2fNvSmIqqWVCVM8rVFFNN2RmD28ck8RghJ0g9RhYaoXIyi4uYKA0ZJT52LF7g4HoOzvs/ffcpvt4a6rairJcsqxnL1ZSqmrNt1wOexmOkvEAXBVJrciUQMiUWEVE6YhT7BJE34I7FH/zonf54PNDtO9ptO+DLesm8mjEvZ8yrOabd4vYJIiko1AVjXaC1RA54QjLgAaPYww9dvJEtB+fBG78Zyre77YCXbcWiWTKt5lyWMz6plszXOxwSxknBTTXmRqEZa4lSGSJPSMVowMPYxQ+dAXcs/ufXfz3s+XbfYbaG1bpm3iy5rOY8Lmf8pyp5uN6Dk/JcWnBXFdzWmkmRU8iMXEYDHqf+NR70J/xPr/2qPwz4FrNtB3zaLPm4XvDfcs4HVQXrI7gpZJqXVMHdQnNLC8YqReYxmQhIUo9R7BDY8qDH9XqcP7768/5gx7LvaM74lVnyuF7wr3LBP+oG1j142YCjC76qJZ/ROROVoPMIIQLixCNKLM41/odv/Ow08zO+XNdY/GGz5G/Vkoe1gY3zDK75spbcUTk3VUKRh+QiIE09whhGIfi23O9xfv/Km9d413LCywH/oFoxb1rYuuAJyBQozee05PNacEuljPMQOeAucexc43Ys97/2k0/jm2v8L3VJ02yg8864BqV4QUteVoLnVcJFHqFEQJZ6Ax6GPX4Ani1/95Ufnrbl0GG69fCgV23Jo2bFX5uKymyh869xqbitJC9rwW2ZciFDdBaQZR5J7BKFEAQ9ng/O21//3ulC9ztM17LaNMzaksdNyYdNzbTtoAvAF5BokIoXteQLtlymTGSEFgEi9UljhyhyCOzndiy//OYbZ7yj7daUm4Z5W/GxKfln0/Cw3cFudCpPFEi7jpKXhrGkTHKLj8gtnrjEocPIfm73/K1Xv3vCD7sBrzcNi7bmf6bko8bwb3tAFnevy78kJXd0zq2n5SFywL0BD0cOvsXf/NbrA77b71gPuGHZVkxNzSNj+Pv6cMbzU3mu+IpSvKgEzw14jBYWD8gSjyRyCQMH3878x6995ym+6dY0G0PZ1szaik9My4ftgcPOXkYOsSLPFV+UdmMsnnEhYwqLZwEi9k/4yD2V/+Devb4/9uwOHZtug9kYqrZmYWouTctH6yPTARcQa14QirvKbozgpsqY5PFwpSoNEInFvXO5g/P9b987/aAPO2x5e8aXpuHKtDxaH3m8D8E9ld8Ris8qxfP2Qp+U5xEyHZ1xlyhw8X2H/wO4ArWA9xUOigAAAABJRU5ErkJggg==`}
					></Image>
				</div>
			</Link>
		</div>
	)
}

export default Painting
