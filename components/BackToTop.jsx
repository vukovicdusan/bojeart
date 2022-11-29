import React from "react"
import { useState } from "react"

const BackToTop = () => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop
		if (scrolled > 500) {
			setVisible(true)
		} else if (scrolled <= 500) {
			setVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const isBrowser = typeof window !== "undefined"

	if (isBrowser) {
		window.addEventListener("scroll", toggleVisible)
	}
	return (
		visible && (
			<button onClick={scrollToTop} className="back-to-top">
				<img
					src="/images/back-to-top.svg"
					width={70}
					height={70}
					alt="back to top button"
				/>
			</button>
		)
	)
}

export default BackToTop
