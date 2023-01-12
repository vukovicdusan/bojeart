/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
}

module.exports = {
	i18n: {
		locales: ["sr"],
		defaultLocale: "sr",
	},
}

module.exports = nextConfig
