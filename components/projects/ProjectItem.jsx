import React, { useState, useRef } from "react"
import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/router"
import * as styles from "../../styles/ProjectItem.module.css"

const ProjectItem = (props) => {
	const [accordionOpen, setAccordionOpen] = useState(false)
	// const router = useRouter()
	// console.log(props.postContent.image)
	//REFS
	const accordionRef = useRef()
	//ACCORDION
	const accordionToggle = (e) => {
		e.preventDefault()
		!accordionOpen ? setAccordionOpen(true) : setAccordionOpen(false)

		if (accordionRef.current.style.maxHeight) {
			accordionRef.current.style.maxHeight = null
		} else {
			accordionRef.current.style.maxHeight =
				accordionRef.current.scrollHeight + "px"
		}
	}

	return (
		// <Link href={"/projekti/" + props.postContent.id}>
		<div className={`${styles.projectItem} [ box ]`}>
			<div
				className={`${accordionOpen ? "accordion-open" : ""}`}
				onClick={accordionToggle}
			>
				<div className={`${styles.projectItemFrame} [ frame ]`}>
					<Image
						className={styles.postImg}
						src={props.postContent.image}
						fill
						sizes="(max-width: 768px) 100vw,
					(max-width: 1200px) 50vw,
					33vw"
						alt="post image"
						placeholder="blur"
						blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABQFJREFUSEtV1VurJFcZgOG3Tl3HVWut6t0zmUwkMiMRJOqVd/4noxKQMBqE4JmI8YCRxDggCKKTfyGYq6AgKhJhZkjcu491WNXd1YeSVd0ze3JfPLx86/so58H9+/2xP7LfdWw3LWtT0dYL2nLGenXJtrykNyu8Y0gUTUjzm2R6QlaMyZQiVYJEpIRZTBiH+JGPH3i4nosz4McnuGHdVrTVEvMs3p7xcEIqT7jQYzKtSKQgyVOiNGaUjAjCAM/ivsXfe1K+HcrbodziU9rV1VB+NOV1ubyBsOUDLkllTpInT3E/fLb8nd/1fX9kt+vYWLytMPWCppxhVldsyksOpsLrI+LogjS/gSgm5LogU/I8loQwjc7l/rncwXnw9nt9fzyy259wYyrqekFdzWhWV7TllENb4x0jovgCkU/IiwuELhAWl9m5PGQUB+eZuzh25u//4rfDg3a2fNvSmIqqWVCVM8rVFFNN2RmD28ck8RghJ0g9RhYaoXIyi4uYKA0ZJT52LF7g4HoOzvs/ffcpvt4a6rairJcsqxnL1ZSqmrNt1wOexmOkvEAXBVJrciUQMiUWEVE6YhT7BJE34I7FH/zonf54PNDtO9ptO+DLesm8mjEvZ8yrOabd4vYJIiko1AVjXaC1RA54QjLgAaPYww9dvJEtB+fBG78Zyre77YCXbcWiWTKt5lyWMz6plszXOxwSxknBTTXmRqEZa4lSGSJPSMVowMPYxQ+dAXcs/ufXfz3s+XbfYbaG1bpm3iy5rOY8Lmf8pyp5uN6Dk/JcWnBXFdzWmkmRU8iMXEYDHqf+NR70J/xPr/2qPwz4FrNtB3zaLPm4XvDfcs4HVQXrI7gpZJqXVMHdQnNLC8YqReYxmQhIUo9R7BDY8qDH9XqcP7768/5gx7LvaM74lVnyuF7wr3LBP+oG1j142YCjC76qJZ/ROROVoPMIIQLixCNKLM41/odv/Ow08zO+XNdY/GGz5G/Vkoe1gY3zDK75spbcUTk3VUKRh+QiIE09whhGIfi23O9xfv/Km9d413LCywH/oFoxb1rYuuAJyBQozee05PNacEuljPMQOeAucexc43Ys97/2k0/jm2v8L3VJ02yg8864BqV4QUteVoLnVcJFHqFEQJZ6Ax6GPX4Ani1/95Ufnrbl0GG69fCgV23Jo2bFX5uKymyh869xqbitJC9rwW2ZciFDdBaQZR5J7BKFEAQ9ng/O21//3ulC9ztM17LaNMzaksdNyYdNzbTtoAvAF5BokIoXteQLtlymTGSEFgEi9UljhyhyCOzndiy//OYbZ7yj7daUm4Z5W/GxKfln0/Cw3cFudCpPFEi7jpKXhrGkTHKLj8gtnrjEocPIfm73/K1Xv3vCD7sBrzcNi7bmf6bko8bwb3tAFnevy78kJXd0zq2n5SFywL0BD0cOvsXf/NbrA77b71gPuGHZVkxNzSNj+Pv6cMbzU3mu+IpSvKgEzw14jBYWD8gSjyRyCQMH3878x6995ym+6dY0G0PZ1szaik9My4ftgcPOXkYOsSLPFV+UdmMsnnEhYwqLZwEi9k/4yD2V/+Devb4/9uwOHZtug9kYqrZmYWouTctH6yPTARcQa14QirvKbozgpsqY5PFwpSoNEInFvXO5g/P9b987/aAPO2x5e8aXpuHKtDxaH3m8D8E9ld8Ris8qxfP2Qp+U5xEyHZ1xlyhw8X2H/wO4ArWA9xUOigAAAABJRU5ErkJggg==`}
					></Image>
				</div>
				<div className={`${styles.accordionTitle} [ wrap ]`}>
					<h4 className="text-clamp">{props.postContent.title}</h4>
					<div className="icon">
						<svg
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							fillRule="evenodd"
							clipRule="evenodd"
							fill="#fbdd00"
						>
							<path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
						</svg>
					</div>
				</div>
			</div>
			<div
				ref={accordionRef}
				className={`${styles.quillContentContainer} [ accordion-content ]`}
				dangerouslySetInnerHTML={{
					__html: props.postContent.content,
				}}
			></div>
		</div>
		// </Link>
	)
}

export default ProjectItem
