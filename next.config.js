/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "icon.horse",
				port: "",
				pathname: "/icon/**",
			},
		],
		// Image Optimization using the default loader is not compatible with export
		// https://nextjs.org/docs/messages/export-image-api
		unoptimized: true,
	},
	output: "export",
	distDir: "build",
};

module.exports = nextConfig;
