/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	distDir: "build",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "icon.horse",
				port: "",
				pathname: "/icon/**",
			},
		],
	},
};

module.exports = nextConfig;
