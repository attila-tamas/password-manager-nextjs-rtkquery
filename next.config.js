/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/app",
				destination: "/app/vault",
				permanent: true,
			},
		];
	},
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
