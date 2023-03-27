/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	async headers() {
		return [
			{
				source: "/fonts/amaticsc-bold-webfont.woff2",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/fonts/amaticsc-regular-webfont.woff2",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/fonts/comforter-regular-webfont.woff2",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		]
	},
}

module.exports = {
	i18n: {
		locales: ["sr"],
		defaultLocale: "sr",
	},
}

module.exports = nextConfig
