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
				<svg
					clipRule="evenodd"
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
					height={70}
					width={70}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="#97dad9"
				>
					<path
						d="m2.014 11.998c0 5.517 4.48 9.997 9.998 9.997s9.997-4.48 9.997-9.997c0-5.518-4.479-9.998-9.997-9.998s-9.998 4.48-9.998 9.998zm6.211-1.524s1.505-1.501 3.259-3.254c.146-.147.338-.22.53-.22s.384.073.53.22c1.754 1.752 3.258 3.254 3.258 3.254.145.145.217.335.217.526 0 .192-.074.384-.221.53-.292.293-.766.295-1.057.004l-1.977-1.977v6.693c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-6.693l-1.979 1.978c-.289.289-.761.287-1.054-.006-.147-.147-.221-.339-.222-.53 0-.191.071-.38.216-.525z"
						fillRule="nonzero"
					/>
				</svg>
			</button>
		)
	)
}

export default BackToTop
