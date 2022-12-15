/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next")

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
}
module.exports = withPlaiceholder({
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
})

module.exports = nextConfig
